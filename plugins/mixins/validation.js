import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.use({
  install (Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          errors: 'validation/errors'
        })
      }
    })
  }
})
