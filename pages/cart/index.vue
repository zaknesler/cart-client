<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <h1 class="title is-4">Your cart</h1>

          <template v-if="products.length">
            <article class="message">
              <CartOverview />
            </article>

            <div class="has-text-right">
              <nuxt-link
                :to="{ name: 'checkout' }"
                class="button is-info is-medium"
              >
                Checkout
              </nuxt-link>
            </div>
          </template>

          <template v-else>
            <article class="message">
              <div class="message-body">
                Your cart is empty.
              </div>
            </article>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import CartOverview from '~/components/cart/CartOverview'

  export default {
    components: {
      CartOverview
    },

    middleware: [
      'redirectIfGuest'
    ],

    computed: {
      ...mapGetters({
        products: 'cart/products',
        empty: 'cart/empty',
        changed: 'cart/changed'
      })
    }
  }
</script>
