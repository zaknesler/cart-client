<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div v-for="product in products" :key="product.slug" class="column is-3">
          <Product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Product from '@/components/products/Product'

  export default {
    components: {
      Product,
    },

    data: () => ({
      products: null
    }),

    async asyncData ({ params, app }) {
      let { data } = await app.$axios.$get(`products?category=${params.slug}`)

      return {
        products: data
      }
    }
  }
</script>
