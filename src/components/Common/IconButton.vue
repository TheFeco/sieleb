<template>
  <v-tooltip bottom :disabled="!tooltip">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" :class="classes" class="d-inline" v-on="on">
        <v-btn icon small v-bind="$attrs" v-on="$listeners">
          <v-icon small v-text="icon" />
        </v-btn>
      </div>
    </template>
    <span class="caption">{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['icon', 'tooltip', 'classes'],
}
</script>
