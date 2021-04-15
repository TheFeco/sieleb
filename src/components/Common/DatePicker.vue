<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-space-click="false"
    nudge-bottom="5"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        depressed
        style="font-size: 0.8125rem"
        background-color="#f5f5f5"
        v-on="on"
        >{{ formated }}</v-btn
      >
    </template>

    <v-date-picker
      no-title
      color="primary"
      :value="value"
      @input="
        $emit('input', $event)
        menu = false
      "
    />
  </v-menu>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    formated() {
      return this.value
        ? this.$moment(this.value).format('LL')
        : 'Seleccionar fecha'
    },
  },
}
</script>
