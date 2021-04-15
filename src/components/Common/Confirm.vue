<template>
  <v-dialog :value="value" persistent max-width="400">
    <v-card>
      <v-card-title class="headline" v-html="texto" />
      <v-card-text v-html="descripcion" />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary lighten-3" text @click="onCancel"
          >Cancelar</v-btn
        >
        <v-btn color="primary darken-1" text @click="onAccept">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    texto: { type: String, default: '' },
    descripcion: { type: String, default: '' },

    hideOnClose: { type: Boolean, default: true },
    hideOnAccept: { type: Boolean, default: false },
  },
  methods: {
    onCancel() {
      this.$emit('cancelar')

      if (this.hideOnClose) this.$emit('input', false)
    },
    onAccept() {
      this.$emit('aceptar')

      if (this.hideOnAccept) this.$emit('input', false)
    },
  },
}
</script>

<style></style>
