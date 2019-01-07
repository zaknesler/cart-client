<template>
  <tr>
    <td>#{{ order.id }}</td>

    <td>{{ order.created_at }}</td>

    <td>
      <div v-for="variation in products" :key="variation.id">
        <nuxt-link
          :to="{
            name: 'products-slug',
            params: {
              slug: variation.product.slug
            }
          }"
        >
          {{ variation.quantity }} x {{ variation.product.name }} ({{ variation.name }}) - {{ variation.type }}
        </nuxt-link>
      </div>

      <template v-if="moreProducts > 0">and {{ moreProducts }} more</template>
    </td>

    <td>{{ order.total }}</td>

    <td>
      <component :is="order.status" />
    </td>
  </tr>
</template>

<script>
  import OrderStatusPending from './statuses/OrderStatusPending'
  import OrderStatusCompleted from './statuses/OrderStatusCompleted'
  import OrderStatusProcessing from './statuses/OrderStatusProcessing'
  import OrderStatusPaymentFailed from './statuses/OrderStatusPaymentFailed'

  export default {
    components: {
      'pending': OrderStatusPending,
      'completed': OrderStatusCompleted,
      'processing': OrderStatusProcessing,
      'payment_failed': OrderStatusPaymentFailed
    },

    props: {
      order: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        maxProducts: 2,

        statusClasses: {
          'is-success': this.order.status === 'complete',
          'is-info': this.order.status === 'processing' || this.order.status === 'pending',
          'is-danger': this.order.status === 'failed',
        }
      }
    },

    computed: {
      products () {
        return this.order.products.slice(0, this.maxProducts)
      },

      moreProducts () {
        return this.order.products.length - this.maxProducts
      }
    }
  }
</script>
