<template>
  <a @click.prevent="logout">Logout</a>
</template>

<script>
  export default {
    methods: {
      async logout () {
        await this.$auth.logout()

        this.$route.replace({
          name: 'index'
        })
      }
    }
  }
</script>
