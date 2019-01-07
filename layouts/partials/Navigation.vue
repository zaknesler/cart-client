<template>
  <nav class="navbar is-blue">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
          Cart
        </nuxt-link>

        <div class="navbar-burger burger" data-target="nav">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <template v-for="category in categories">
          <template v-if="category.children.length">
            <div :key="category.slug" class="navbar-item is-hoverable has-dropdown">
              <nuxt-link
                :to="{ name: 'categories-slug', params: { slug: category.slug } }"
                class="navbar-link"
              >
                {{ category.name }}
              </nuxt-link>

              <div class="navbar-dropdown">
                <nuxt-link
                  v-for="child in category.children"
                  :key="child.slug"
                  :to="{ name: 'categories-slug', params: { slug: child.slug } }"
                  class="navbar-item"
                >
                  {{ child.name }}
                </nuxt-link>
              </div>
            </div>
          </template>

          <template v-else>
            <nuxt-link
              :key="category.slug"
              :to="{ name: 'categories-slug', params: { slug: category.slug } }"
              class="navbar-item"
            >
              {{ category.name }}
            </nuxt-link>
          </template>
        </template>
      </div>

      <div id="nav" class="navbar-menu">
        <div class="navbar-end">
          <template v-if="!$auth.loggedIn">
            <nuxt-link :to="{ name: 'auth-login'}" class="navbar-item">
              Sign in
            </nuxt-link>
          </template>

          <template v-else>
            <nuxt-link :to="{ name: 'cart'}" class="navbar-item">
              Cart ({{ cartCount }})
            </nuxt-link>

            <div class="navbar-item is-hoverable has-dropdown">
              <div class="navbar-link">{{ $auth.user.name }}</div>

              <div class="navbar-dropdown">
                <nuxt-link :to="{ name: 'orders'}" class="navbar-item">Orders</nuxt-link>
                <LogoutComponent class="navbar-item" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  import LogoutComponent from '~/components/globals/LogoutComponent'

  export default {
    components: {
      LogoutComponent
    },

    computed: {
      ...mapGetters({
        categories: 'categories',
        cartCount: 'cart/count',
      })
    }
  }
</script>
