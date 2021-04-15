<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="800px"
    full-width
  >
    <v-card>
      <v-card-title>Alumno</v-card-title>

      <v-card-text lass="px-2 pb-2">
        <v-form v-model="valid">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <Field
                  placeholder="CURP *"
                  v-model="form.curp"
                  required
                  :rules="rules.curp"
                  icon="mdi-badge-account-horizontal-outline"
                  autofocus
                />
              </v-col>
              <v-col cols="12">
                <Field
                  placeholder="Nombre *"
                  v-model="form.nombre"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Primer apellido *"
                  v-model="form.primer_apellido"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Segundo apellido *"
                  v-model="form.segundo_apellido"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <v-radio-group v-model="form.genero" row>
                  <v-radio
                    class="mr-4"
                    label="Masculino"
                    color="primary"
                    hide-details
                    :value="1"
                  />
                  <v-radio
                    label="Femenino"
                    color="primary"
                    hide-details
                    :value="2"
                  />
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.id_grupo"
                  placeholder="Grupo *"
                  :items="grupos"
                  required
                  :rules="rules.required"
                  icon="mdi-format-list-numbered"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.id_grado"
                  placeholder="Grado *"
                  :items="grados"
                  required
                  :rules="rules.required"
                  icon="mdi-format-list-numbered"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Escuela (CCT) *"
                  v-model="form.cct"
                  required
                  :rules="rules.cct"
                  icon="mdi-domain"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select
                  v-model="form.id_turno"
                  placeholder="Turno *"
                  :items="turnos"
                  required
                  :rules="rules.required"
                  icon="mdi-format-list-numbered"
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
const REGEXCURP = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
const formFields = [
  "curp",
  "cct",
  "nombre",
  "primer_apellido",
  "segundo_apellido",
  "genero",
  "id_grado",
  "id_grupo",
  "id_turno",
];
export default {
  components: {
    Select: () => import("@/components/Form/Select"),
    Field: () => import("@/components/Form/Field"),
    // Textarea: ()=> import('@/components/Form/Textarea')
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
  mounted() {
    this.$watch(
      (vm) => [vm.value, vm.data],
      ([open, form]) => {
        this.isCreate = isEmpty(form);
        if (open) {
          this.form = pick(form, formFields);
          this.load();
        }
        if (isEmpty(form))
          this.form = { ...this.form, genero: 1, turno: 1, grado: 1 };
      },
      {
        immediate: true,
        deep: true,
      }
    );
  },
  data() {
    return {
      isCreate: true,
      valid: true,
      rules: {
        required: [(v) => !!v],
        curp: [(v) => !!v, (v) => v && !!v.match(REGEXCURP)],
        cct: [(v) => !!v, (v) => v && !!v.match(REGEXCCT)],
      },
      form: {
        sexo: 1,
        grado: 1,
        turno: true,
      },
      catalogos: {
        turnos: [],
        grupos: [],
      },
    };
  },
  created() {
    const regex = /^\d{2}[a-zA-Z]{3}\d{4}[a-zA-Z]{1}/;
    console.log("25DES0027F".match(regex));

    /^([0-9]{2}[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1})$/;
  },
  methods: {
    async load() {
      const res = await this.$api.alumnos.create();
      this.catalogos.turnos = res.turnos;
      this.catalogos.grupos = res.grupos;
      console.log(res);
    },
    cancelar() {
      this.$emit("input", false);
    },
    async aceptar() {
      try {
        const params = pick(this.form, formFields);

        let alumno = null;

        if (this.isCreate) {
          alumno = await this.$api.alumnos.store(params);
        } else {
          const id = this.data.id;
          alumno = await this.$api.alumnos.update(id, params);
        }

        this.$emit("on-aceptar", alumno);
        this.$emit("input", false);
      } catch (error) {
        this.$emit("on-error", "Error al querer guardar");
      }
    },
  },
  computed: {
    turnos() {
      return this.catalogos.turnos.map((v) => ({
        value: v.id,
        text: v.nombre,
      }));
    },
    grupos() {
      return this.catalogos.grupos.map((v) => ({
        value: v.id,
        text: v.nombre,
      }));
    },
    grados() {
      return Array(6)
        .fill({})
        .map((v, i) => ({ value: i + 1, text: `${i + 1}º` }));
    },
  },
};
</script>
