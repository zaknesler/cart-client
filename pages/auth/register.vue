<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-3">
          <h1 class="title is-4">Sign up</h1>

          <form class="box" @submit.prevent="register">
            <div class="field">
              <label class="label">Name</label>

              <div class="control">
                <input
                  v-model="form.name"
                  :class="{ 'is-danger': errors.name }"
                  class="input"
                  type="text"
                  placeholder="John Doe"
                  autofocus
                  required
                >

                <p v-if="errors.name" class="help is-danger">{{ errors.name[0] }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>

              <div class="control">
                <input
                  v-model="form.email"
                  :class="{ 'is-danger': errors.email }"
                  class="input"
                  type="email"
                  placeholder="you@example.com"
                  required
                >

                <p v-if="errors.email" class="help is-danger">{{ errors.email[0] }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>

              <div class="control">
                <input v-model="form.password" class="input" type="password" required>
              </div>
            </div>

            <div class="field">
              <p class="control">
                <button class="button is-info">
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data: () => ({
      form: {
        name: '',
        email: '',
        password: '',
      },

      errors: []
    }),

    middleware: [
      'redirectIfAuthenticated'
    ],

    methods: {
      ...mapActions({
        flash: 'alert/flash'
      }),

      async register () {
        await this.$axios.$post('/auth/register', this.form)
          .then(({ data }) => {
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)

              return
            }

            this.flash('Your account has been registered and you may now sign in.')

            this.$router.push({
              name: 'auth-login'
            })
          })
          .catch(({ response }) => {
            if (response) {
              this.errors = response.data.errors
            }
          })
      }
    }
  }
</script>
