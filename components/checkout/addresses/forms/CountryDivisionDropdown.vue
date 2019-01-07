<template>
  <select @change="changed">
    <option value="">Please select</option>
    <option
      v-for="division in divisions"
      :key="division.id"
      :value="division.id"
    >
      {{ division.name }}
    </option>
  </select>
</template>

<script>
  export default {
    props: {
      divisions: {
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
