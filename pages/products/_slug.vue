<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-half">
          <img src="http://via.placeholder.com/620x620" alt="Product name">
        </div>

        <div class="column is-half">
          <section class="section">
            <h1 class="title is-4">
              {{ product.name }}
            </h1>

            <p v-if="product.description">{{ product.description }}</p>

            <hr>

            <span v-if="!product.in_stock" class="tag is-rounded is-medium is-dark">
              Out of Stock
            </span>

            <span class="tag is-rounded is-medium">
              {{ product.price }}
            </span>
          </section>

          <section class="section">
            <form action="#">
              <ProductVariation
                v-for="(variations, type) in product.variations"
                :key="type"
                :variations="variations"
                :type="type"
                v-model="form.variation"
              />

              <div v-if="form.variation" class="field has-addons">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="form.quantity">
                      <option
                        v-for="count in parseInt(form.variation.stock_count)"
                        :key="count"
                        :value="count"
                      >
                        {{ count }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="control">
                  <button type="submit" class="button is-info">Add to Cart</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductVariation from '~/components/products/ProductVariation'

  export default {
    components: {
      ProductVariation
    },

    data: () => ({
      product: null,

      form: {
        variation: '',
        quantity: 1
      }
    }),

    watch: {
      'form.variation' () {
        this.form.quantity = 1
      }
    },

    async asyncData ({ params, app }) {
      let { data } = await app.$axios.$get(`products/${params.slug}`)

      return {
        product: data
      }
    }
  }
</script>
