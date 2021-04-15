<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="900px"
    full-width
  >
    <v-card>
      <v-card-title>Escuela</v-card-title>

      <v-card-text lass="px-2 pb-2">
        <v-form v-model="valid">
          <v-container class="py-0">
            <v-row>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.id_municipio"
                  placeholder="Municipio *"
                  :items="municipios"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.id_localidad"
                  placeholder="Localidad *"
                  :items="localidades"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.id_nivel"
                  placeholder="Nivel *"
                  :items="niveles"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.modalidad"
                  placeholder="Modalidad *"
                  :items="['DML', 'DPB', 'DPR']"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Sector *"
                  v-model="form.sector"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Zona *"
                  v-model="form.zona"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.rur_urb"
                  placeholder="Contexto (rural, urbano) *"
                  :items="[
                    { value: 'URBANA', text: 'Urbana' },
                    { value: 'RURAL', text: 'Rural' },
                  ]"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <!-- <v-col sm="6" cols="12">
                <v-checkbox
                  v-model="form.turno"
                  label="Turno matutino"
                  color="primary"
                  hide-details
                />
              </v-col> -->

              <v-col sm="6" cols="12">
                <Field
                  placeholder="CCT *"
                  v-model="form.cct"
                  required
                  :rules="rules.cct"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="12" cols="12">
                <Field
                  placeholder="Nombre *"
                  v-model="form.nombre"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>

              <v-col sm="12" cols="12">
                <Textarea
                  v-model="form.domicilio"
                  placeholder="Domicilio"
                  icon="mdi-text"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="cancelar">Cancelar</v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="aceptar"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable camelcase */
import { isEmpty, pick } from "lodash";

const REGEXCCT = /^([0-9]{2}[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1})$/;
const formFields = [
  "cct",
  "nombre",
  "domicilio",
  "sector",
  "zona",
  "id_municipio",
  "id_localidad",
  "id_nivel",
  "modalidad",
  "rur_urb",
];
export default {
  components: {
    Select: () => import("@/components/Form/Select"),
    Field: () => import("@/components/Form/Field"),
    Textarea: () => import("@/components/Form/Textarea"),
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  async created() {
    const res = await this.$api.escuelas.create();

    this.catalogos = res;
  },
  mounted() {
    this.$watch(
      (vm) => [vm.value, vm.data],
      ([open, form]) => {
        this.isCreate = isEmpty(form);

        if (open) this.form = pick(form, formFields);
        if (isEmpty(form))
          this.form = { ...this.form, genero: 1, turno: true, grado: 1 };
      },
      { immediate: true, deep: true }
    );
    this.$watch(
      (vm) => [vm.form.id_municipio],
      () => {
        console.log(this.localidades);
        const localidad = this.localidades.find(
          (v) => v.value === this.form.id_localidad
        );

        console.log(this.form.id_localidad, localidad);
        if (!localidad) this.form.id_localidad = 0;
      },
      { immediate: true, deep: true }
    );
  },
  data() {
    return {
      isCreate: true,
      valid: true,
      rules: {
        required: [(v) => !!v],
        cct: [(v) => !!v, (v) => v && !!v.match(REGEXCCT)],
      },
      form: {},
      catalogos: {
        municipios: [],
        localidades: [],
        niveles: [],
      },
    };
  },
  methods: {
    cancelar() {
      this.$emit("input", false);
    },
    async aceptar() {
      try {
        const params = pick(this.form, formFields);

        let escuela = null;

        if (this.isCreate) {
          escuela = await this.$api.escuelas.store(params);
        } else {
          const id = this.data.id;
          escuela = await this.$api.escuelas.update(id, params);
        }

        this.$emit("on-aceptar", escuela);
        this.$emit("input", false);
      } catch (error) {
        this.$emit("on-error", "Error al querer guardar");
      }
    },
  },
  computed: {
    municipios() {
      return this.catalogos.municipios.map((v) => ({
        value: v.id,
        text: v.nombre,
      }));
    },
    localidades() {
      return this.catalogos.localidades
        .filter((v) => v.id_municipio === this.form.id_municipio)
        .map((v) => ({
          value: v.id,
          text: v.nombre,
        }));
    },
    niveles() {
      return this.catalogos.niveles.map((v) => ({
        value: v.id,
        text: v.nombre,
      }));
    },
  },
};
</script>
