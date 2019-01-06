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
              <a
                href="#"
                class="button is-info is-medium"
              >
                Checkout
              </a>
            </div>
          </template>

          <template v-else>
            <article class="message is-info">
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

    computed: {
      ...mapGetters({
        products: 'cart/products',
        empty: 'cart/empty'
      })
    }
  }
</script>
