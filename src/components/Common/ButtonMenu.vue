<template>
  <v-menu offset-y nudge-bottom="5" :max-height="maxHeight">
    <template v-slot:activator="{ on }">
      <v-btn :class="classes" v-on="on" v-bind="buttonProps">
        <slot :data="selected">
          <span>{{ selected.text }}</span>
        </slot>
        <v-icon v-if="showIcon" small right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item-group v-model="item" color="primary" mandatory>
        <v-list-item
          v-for="(v, i) in items"
          :key="i"
          @click="select(v)"
          :value="v.value"
        >
          <slot name="item" :data="v">
            <v-list-item-title>{{ v.text }}</v-list-item-title>
          </slot>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    items: [Array],
    hideIcon: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [String, Number],
      default: 'auto',
    },
    classes: [String, Array, Object],
  },
  inheritAttrs: false,
  methods: {
    select(v) {
      this.$emit('input', v.value)
      this.$emit('select', v.value)
    },
  },
  data() {
    return {
      item: this.value,
    }
  },
  computed: {
    buttonProps() {
      return {
        text: true,
        small: true,
        ...this.$attrs,
      }
    },
    selected() {
      const found = this.items.find((v) => v.value === this.value)
      return found || {}
    },
    showIcon() {
      if ('icon' in this.$attrs) return false

      return !this.hideIcon
    },
  },
}
</script>
