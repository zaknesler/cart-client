import Vue from 'vue'
import { mapActions } from 'vuex'

Vue.use({
  install (Vue, options) {
    Vue.mixin({
      methods: {
        ...mapActions({
          flash: 'alert/flash'
        })
      }
    })
  }
})
