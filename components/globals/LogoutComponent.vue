<template>
  <a @click.prevent="logout">Sign out</a>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions({
        flash: 'alert/flash'
      }),

      async logout () {
        await this.$auth.logout()

        this.flash('You have been signed out.')
      }
    }
  }
</script>
