<template>
  <tr>
    <td width="120">
      <img src="http://via.placeholder.com/60x60" alt="Product image">
    </td>

    <td>
      <div>{{ product.product.name }}</div>
      <div class="has-text-grey">{{ product.type }} / {{ product.name }}</div>
    </td>

    <td width="160">
      <div class="field">
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="quantity">
              <option v-if="product.quantity == 0" value="0">0</option>
              <option
                v-for="count in product.stock_count"
                :key="count"
                :value="count"
                :selected="count == product.quantity"
              >
                {{ count }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </td>

    <td>{{ product.total }}</td>

    <td>
      <a href="#" @click.prevent="destroy(product.id)">Remove</a>
    </td>
  </tr>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      product: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        quantity: this.product.quantity
      }
    },

    watch: {
      'quantity' (quantity) {
        this.update({ productId: this.product.id, quantity })
      }
    },

    methods: {
      ...mapActions({
        destroy: 'cart/destroy',
        update: 'cart/update'
      })
    }
  }
</script>
