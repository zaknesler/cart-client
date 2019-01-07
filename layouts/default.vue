<template>
  <div>
    <AlertComponent />
    <Navigation />
    <nuxt/>
  </div>
</template>

<script>
  import Navigation from '@/layouts/partials/Navigation'
  import AlertComponent from '@/components/globals/AlertComponent'

  export default {
    components: {
      Navigation,
      AlertComponent
    }
  }
</script>
