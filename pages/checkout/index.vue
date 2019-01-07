<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-quarters">
          <ShippingAddress :addresses="addresses" v-model="form.address_id" />

          <article v-if="shippingMethodId" class="message">
            <div class="message-body">
              <h1 class="title is-5">
                Shipping
              </h1>

              <div class="select is-fullwidth">
                <select v-model="shippingMethodId">
                  <option
                    v-for="shippingMethod in shippingMethods"
                    :key="shippingMethod.id"
                    :value="shippingMethod.id"
                  >
                    {{ shippingMethod.name }} ({{ shippingMethod.price }})
                  </option>
                </select>
              </div>
            </div>
          </article>

          <article class="message">
            <div class="message-body">
              <h1 class="title is-5">Payment</h1>
            </div>
          </article>

          <article v-if="products.length" class="message">
            <div class="message-body">
              <h1 class="title is-5">
                Cart summary
              </h1>

              <CartOverview>
                <template v-if="shippingMethodId" slot="rows">
                  <tr>
                    <td />
                    <td />

                    <td>
                      <p class="has-text-weight-bold">Shipping</p>
                    </td>

                    <td>
                      <p>{{ shipping.price }}</p>
                    </td>

                    <td />
                  </tr>

                  <tr>
                    <td />
                    <td />

                    <td>
                      <p class="has-text-weight-bold">Total</p>
                    </td>

                    <td>
                      <p>{{ total }}</p>
                    </td>

                    <td />
                  </tr>
                </template>
              </CartOverview>
            </div>
          </article>

          <article class="message">
            <div class="message-body">
              <button
                :disabled="empty || submitting"
                class="button is-info is-fullwidth is-medium"
                @click.prevent="placeOrder"
              >
                Place order
              </button>
            </div>
          </article>
        </div>

        <div class="column is-one-quarter">
          <article class="message">
            <div class="message-body">
              <button
                :disabled="empty || submitting"
                class="button is-info is-fullwidth is-medium"
                @click.prevent="placeOrder"
              >
                Place order
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import CartOverview from '~/components/cart/CartOverview'
  import ShippingAddress from '~/components/checkout/addresses/ShippingAddress'

  export default {
    components: {
      CartOverview,
      ShippingAddress
    },

    data: () => ({
      submitting: false,

      addresses: [],
      shippingMethods: [],

      form: {
        address_id: null
      }
    }),

    computed: {
      ...mapGetters({
        total: 'cart/total',
        products: 'cart/products',
        empty: 'cart/empty',
        shipping: 'cart/shipping'
      }),

      shippingMethodId: {
        get () {
          return this.shipping ? this.shipping.id : ''
        },

        set (shippingMethodId) {
          this.setShipping(
            this.shippingMethods.find(s => s.id === shippingMethodId)
          )
        }
      }
    },

    watch: {
      'form.address_id' (addressId) {
        this.getShippingMethodsForAddress(addressId).then(() => {
          this.setShipping(this.shippingMethods[0])
        })
      },

      shippingMethodId () {
        this.getCart()
      }
    },

    methods: {
      ...mapActions({
        setShipping: 'cart/setShipping',
        getCart: 'cart/getCart',
        flash: 'alert/flash'
      }),

      async getShippingMethodsForAddress (addressId) {
        let response = await this.$axios.$get(`/addresses/${addressId}/shipping`)

        this.shippingMethods = response.data

        return response
      },

      async placeOrder () {
        this.submitting = true

        try {
          await this.$axios.$post('/orders', {
            shipping_method_id: this.shippingMethodId,
            payment_method_id: 1,
            ...this.form
          })

          await this.getCart()

          this.$router.replace({ name: 'orders' })
        } catch (e) {
          this.flash(e.response.data.message)

          this.getCart()

          this.submitting = false
        }
      }
    },

    async asyncData ({ app }) {
      let { data } = await app.$axios.$get('/addresses')

      return {
        addresses: data
      }
    }
  }
</script>
