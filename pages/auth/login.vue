<template>
  <div class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-3">
          <h1 class="title is-4">Sign in</h1>

          <form class="box" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>

              <div class="control">
                <input
                  v-model="form.email"
                  :class="{ 'is-danger': errors.email }"
                  class="input"
                  type="email"
                  placeholder="you@example.com"
                  autofocus
                  required
                >

                <p v-if="errors.email" class="help is-danger">{{ errors.email[0] }}</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>

              <div class="control">
                <input
                  v-model="form.password"
                  :class="{ 'is-danger': errors.password }"
                  class="input"
                  type="password"
                  required
                >

                <p v-if="errors.password" class="help is-danger">{{ errors.password[0] }}</p>
              </div>
            </div>

            <div class="field">
              <p class="control">
                <button class="button is-info">
                  Sign in
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
  export default {
    data: () => ({
      form: {
        email: '',
        password: '',
      }
    }),

    middleware: [
      'redirectIfAuthenticated'
    ],

    methods: {
      async login () {
        await this.$auth.loginWith('local', {
          data: this.form
        })
      }
    }
  }
</script>
