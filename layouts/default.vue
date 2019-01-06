<template>
  <div>
    <Navigation />
    <nuxt/>
  </div>
</template>

<script>
  import Navigation from '@/layouts/partials/Navigation'

  export default {
    components: {
      Navigation,
    },

    head: () => ({
      htmlAttrs: {
        class: 'font-sans font-normal leading-normal tracking-normal roman text-base bg-grey-lighter text-grey-darker antialiased',
      },
    }),
  }
</script>
