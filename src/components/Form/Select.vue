<template>
  <v-layout>
    <v-icon v-if="icon" class="mr-4">{{icon}}</v-icon>
    <v-select
      :value="value"
      @input="$emit('input', $event)"
      
      no-data-text="Sin registros"

      hide-details
      background-color="rgba(200,200,200,0.2)"
      flat
      solo
      :menu-props="{ bottom: true, offsetY: true }"

      v-bind="$attrs"
      v-on="$listeners"
    />
  </v-layout>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  }
}
</script>
