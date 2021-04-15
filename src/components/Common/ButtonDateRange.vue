<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-bottom="5"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
    v-model="menu"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" text small>
        <slot>
          <v-icon small left v-text="'mdi-calendar'" />
          {{ range }}
        </slot>
      </v-btn>
    </template>

    <v-date-picker
      no-title
      scrollable
      range
      :value="value"
      color="primary lighten-1"
      @input="change($event)"
    />

    <v-list>
      <v-list-item @click="noRange = !noRange">
        <v-list-item-action>
          <v-checkbox :input-value="noRange"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Sin rango de tiempo</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({ menu: false, dates: [], noRange: false }),
  methods: {
    change(e) {
      const dates = e.map((v) => this.$moment(v))
      let date1 = dates[0]
      let date2 = dates[1] ? dates[1] : null

      if (date2 && date1.isAfter(date2)) {
        date1 = dates[1]
        date2 = dates[0]
      }

      const res = [date1, date2]
        .filter((v) => !!v)
        .map((v) => v.format('YYYY-MM-DD'))

      this.noRange = false
      this.$emit('input', res)

      if (e.length === 2) this.menu = false
    },
  },
  computed: {
    range() {
      if (this.noRange) return 'Sin rango'
      if (!this.value.length) return 'Seleccionar'

      const date1 = this.$moment(this.value[0]).format('DD.MM')
      const date2 = this.value[1]
        ? this.$moment(this.value[1]).format('DD.MM')
        : ''

      return `${date1} - ${date2}`
    },
  },
  watch: {
    noRange(value) {
      if (value) {
        this.$emit('input', [])
      } else if (!this.value.length) {
        this.$emit('input', [
          this.$moment().startOf('month').format('YYYY-MM-DD'),
          this.$moment().endOf('month').format('YYYY-MM-DD'),
        ])
      }
    },
  },
}
</script>

<style></style>
