<template>
  <form @submit.prevent="store">
    <div class="field">
      <label class="label">Name</label>

      <div class="control">
        <input v-model="form.name" class="input" type="text">
      </div>
    </div>

    <div class="field">
      <label class="label">Address line 1</label>

      <div class="control">
        <input v-model="form.address_1" class="input" type="text">
      </div>
    </div>

    <div class="field">
      <label class="label">Address line 2</label>

      <div class="control">
        <input v-model="form.address_2" class="input" type="text">
      </div>
    </div>

    <div class="field">
      <label class="label">City</label>

      <div class="control">
        <input v-model="form.city" class="input" type="text">
      </div>
    </div>

    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <label class="label">Postal code</label>

          <div class="control">
            <input v-model="form.postal_code" class="input" type="text">
          </div>
        </div>
      </div>

      <div class="column is-4">
        <div class="field">
          <label class="label">Country</label>

          <div class="control">
            <div class="select is-fullwidth">
              <CountryDropdown :countries="countries" v-model="form.country_id" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedCountry && showDivisionsDropdown" class="column is-4">
        <div class="field">
          <label class="label">{{ selectedCountry.division_type }}</label>

          <div class="control">
            <div class="select is-fullwidth">
              <CountryDivisionDropdown :divisions="selectedCountry.divisions" v-model="form.country_division_id" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <p class="control">
        <button class="button is-info">
          Add address
        </button>

        <a class="button is-text" @click.prevent="$emit('cancel')">Cancel</a>
      </p>
    </div>
  </form>
</template>

<script>
  import CountryDropdown from './forms/CountryDropdown'
  import CountryDivisionDropdown from './forms/CountryDivisionDropdown'

  export default {
    components: {
      CountryDropdown,
      CountryDivisionDropdown
    },

    data () {
      return {
        countries: [],

        selectedCountry: null,
        showDivisionsDropdown: false,

        form: {
          name: '',
          address_1: '',
          address_2: '',
          city: '',
          postal_code: '',
          country_id: '',
          country_division_id: '',
          default: true
        }
      }
    },

    watch: {
      'form.country_id' (countryId) {
        this.selectedCountry = this.getCountryById(countryId)

        if (this.selectedCountry) {
          this.showDivisionsDropdown = this.selectedCountry.has_divisions
        }

        this.form.country_division_id = ''
      }
    },

    created () {
      this.getCountries()
    },

    methods: {
      async getCountries() {
        let { data } = await this.$axios.$get('/countries')

        this.countries = data
      },

      getCountryById(countryId) {
        return this.countries.find((c) => c.id == countryId)
      },

      async store () {
        let { data } = await this.$axios.$post('/addresses', this.form)

        this.$emit('created', data)
      }
    }
  }
</script>
