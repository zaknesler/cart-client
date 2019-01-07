<template>
  <select @change="changed">
    <option value="">Please select</option>
    <option
      v-for="country in countries"
      :key="country.id"
      :value="country.id"
    >
      {{ country.name }}
    </option>
  </select>
</template>

<script>
  export default {
    props: {
      countries: {
        required: true,
        type: Array
      }
    },

    methods: {
      changed ($event) {
        this.$emit('input', $event.target.value)
      }
    }
  }
</script>
