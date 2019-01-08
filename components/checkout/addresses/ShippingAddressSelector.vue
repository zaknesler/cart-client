<template>
  <table class="table is-hoverable is-fullwidth">
    <tbody>
      <tr v-for="address in addresses" :key="address.id">
        <td :class="{ 'has-text-weight-bold': address.id === selectedAddress.id }">
          <p>{{ address.name }}</p>
          <p>{{ address.address_1 }}</p>
          <p>{{ address.address_2 }}</p>
          <p>{{ address.city }} {{ address.postal_code }}</p>
          <p v-if="address.country_division">
            {{ address.country_division.name }}, {{ address.country.name }}
          </p>
          <p v-else>{{ address.country.name }}</p>
        </td>

        <td>
          <a class="button is-info" @click.prevent="$emit('click', address)">Ship here</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      addresses: {
        required: true,
        type: Array
      },

      selectedAddress: {
        required: true,
        type: Object
      }
    }
  }
</script>
