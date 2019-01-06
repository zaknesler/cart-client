<template>
  <div class="bg-white border-b">
    <div class="p-6 max-w-2xl mx-auto flex items-baseline justify-between">
      <!-- Left Navigation -->
      <nav>
        <nuxt-link
          :to="{ name: 'index' }"
          class="font-semibold text-blue-dark no-underline hover:underline"
        >
          Cart
        </nuxt-link>

      </nav>

      {{ categories }}

      <!-- Right Navigation -->
      <nav>
        <nuxt-link
          :to="{ name: 'index' }"
          class="text-grey-darkest no-underline hover:underline"
        >
          Sign in
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        categories: 'categories'
      }),
    },
  }
</script>
