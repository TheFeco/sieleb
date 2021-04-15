<template>
    <v-card>
      <v-card-title>Examen</v-card-title>

      <v-card-text lass="px-2 pb-2">
        <v-form v-model="valid">
          <v-container class="py-0">
            <v-row>
              <v-col sm="12" cols="12">
                <Field
                  placeholder="Titulo *"
                  v-model="form.titulo"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <v-radio-group label="Estatus del Examen" v-model="form.estado" row>
                  
                  <v-radio
                    class="mr-4"
                    label="Activo"
                    color="primary"
                    hide-details
                    :value="1"
                  />
                  <v-radio
                    label="Inactivo"
                    color="primary"
                    hide-details
                    :value="2"
                  />
                </v-radio-group>
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
                <Field
                  placeholder="gestion(año del examen) *"
                  v-model="form.sector"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Tiempo en minutos *"
                  v-model="form.tiempo"
                  required
                  :rules="rules.numberRule"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="12" cols="12">
                <p>Fecha de termino</p>
                <v-date-picker v-model="form.fecha_termino" locale="es-mx"></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="aceptar"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
</template>

<script>
/* eslint-disable camelcase */
import { isEmpty, pick } from "lodash";

const REGEXCCT = /^([0-9]{2}[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1})$/;
const formFields = [
  "titulo",
  "estado",
  "id_nivel",
  "tiempo",
  "fecha_termino",
];
export default {
  components: {
    Select: () => import("@/components/Form/Select"),
    Field: () => import("@/components/Form/Field"),
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
          this.form = { ...this.form, genero: 1, turno: true, grado: 1, estado: 1, fecha_termino: new Date().toISOString().substr(0, 10)};
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
        numberRule: [v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 999)],
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
    async aceptar() {
      try {
        const params = pick(this.form, formFields);

        let escuela = null;

        if (this.isCreate) {
          console.log(params);
          // escuela = await this.$api.escuelas.store(params);
        } else {
          console.log("editar");
          // const id = this.data.id;
          // escuela = await this.$api.escuelas.update(id, params);
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
