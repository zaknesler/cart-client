<template>
  <a @click.prevent="logout">Sign out</a>
</template>

<script>
  export default {
    methods: {
      async logout () {
        await this.$auth.logout()

        this.flash('You have been signed out.')
      }
    }
  }
</script>
