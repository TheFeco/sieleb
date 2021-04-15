<template>
<div class="bg-imagen">
  <encabezado/>
  <v-container class="mt-8 mb-8" style="height: 70%;">
    <v-row class="d-flex align-center" 
      style="height: 100%;"
    >
      <v-col md="5" cols="12" class="bg-blue text-light p-4 mt-4  flex-grow-1">
          <h4 class="text-center mb-4 white--text">INGRESO A LA EVALUACIÓN</h4>
          <v-row>
            <v-form v-model="valid">
              <v-col sm="12" cols="12">
                  <Field
                    placeholder="Ingresa tu Curp"
                    v-model="form.vc_curp"
                    required
                    :rules="rules.required"
                    icon="mdi-lock-outline"
                  />
              </v-col>
              <v-col class="text-center mt-4 d-flex justify-content-star">
              <v-btn
                color="warning"
                elevation="2"
                x-large
              >
                <v-icon>mdi-account-arrow-right-outline</v-icon> Ingresar
              </v-btn>
            </v-col>
            </v-form>
          </v-row>
      </v-col>
      <v-col md="6" cols="12"
      class="bg-gray text-light ml-2 p-4 mt-4"
      >
            <div class="text-center white--text lead mb-9">
              <b>ACCEDE A TU CUENTA PARA LA EVALUACIÓN</b>
            </div>
            <div class="warning--text mb-9">
            <ul style="list-style: none;">
              <li>
                <v-icon color="warning">mdi-hand-pointing-right</v-icon> Ingresa a la Evaluación
              </li>
              <li>
                <v-icon color="warning">mdi-hand-pointing-right</v-icon> Responde las Preguntas
              </li>
              <li>
                <v-icon color="warning">mdi-hand-pointing-right</v-icon> Imprime tu hoja de
                respuestas
              </li>
            </ul>
          </div>
      </v-col>
    </v-row>
  </v-container>
  <pie/>
</div>
    
</template>

<script>

  export default {
    components: {
      encabezado: () => import('@/components/logins/partials/header'),
      pie: () => import('../components/logins/partials/footer'),
      Field: ()=> import('@/components/Form/Field'),
    },
    data () {
      return {
        valid: true,
        rules: {
          required: [(v) => !!v || 'Este campo es requerido'],
        },
        form: {}
      }
    },
    computed:{
    },
    methods: {
    }
  }
</script>
<style>
 .bg-blue { background: rgba(47, 175, 255, 0.8); }
 .bg-gray { background: rgba(76, 75, 75, 0.6); }
 .bg-imagen { background-image: url(../assets/notebook.jpg); background-position: center center; background-repeat: no-repeat; background-attachment: fixed; background-size: cover; height: 100%;}
 .lead { font-size: 1.25rem; font-weight: 300; }
</style>