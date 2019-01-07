<template>
  <form @submit.prevent="storePaymentMethod">
    <div class="field">
      <div id="card-element" class="box column is-half" />
    </div>

    <br>

    <div class="field">
      <p class="control">
        <button :disabled="storing" class="button is-info">
          Add card
        </button>

        <button class="button is-text" @click.prevent="$emit('cancel')">
          Cancel
        </button>
      </p>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        stripe: null,
        card: null,

        storing: false
      }
    },

    mounted () {
      const stripe = Stripe(process.env.STRIPE_KEY)

      this.stripe = stripe

      this.card = this.stripe.elements().create('card', {
        style: {
          base: {
            fontSize: '16px'
          }
        }
      })

      this.card.mount('#card-element')
    },

    methods: {
      async storePaymentMethod () {
        this.storing = true

        const { token, error } = await this.stripe.createToken(this.card);

        if (error) {
          //
        } else {
          let { data } = await this.$axios.$post('/payment-methods', {
            token: token.id
          })

          this.$emit('added', data)
        }

        this.storing = false
      }
    }
  }
</script>
