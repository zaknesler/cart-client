<template>
  <table class="table is-hoverable is-fullwidth">
    <tbody>
      <CartOverviewProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </tbody>

    <tr>
      <td />
      <td />

      <td>
        <p class="has-text-weight-bold">Subtotal</p>
      </td>

      <td>
        <p>{{ subtotal }}</p>
      </td>

      <td />
    </tr>

    <slot name="rows" />
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'

  import CartOverviewProduct from '~/components/cart/CartOverviewProduct'

  export default {
    components: {
      CartOverviewProduct
    },

    computed: {
      ...mapGetters({
        products: 'cart/products',
        subtotal: 'cart/subtotal',
        total: 'cart/total'
      })
    }
  }
</script>
