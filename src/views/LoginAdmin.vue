<template>
  <div class="bg-imagen">
    <encabezado titulo="Plataforma Administrador"/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="pa-3"
            shaped
            elevation="2"
            >
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../assets/sepyclogo.jpg" alt="sepyc" width="auto" height="180">
                  <h1 class="flex my-4 primary--text"></h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="mdi-account"
                    name="user"
                    label="Login"
                    type="text"
                    v-model="userEmail"
                    :error="error"
                    :rules="[rules.required]"/>
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <pie/>
  </div>
</template>
<script>

  export default {
    components: {
      encabezado: () => import('@/components/logins/partials/header'),
      pie: () => import('../components/logins/partials/footer'),
    },
    data () {
      return {
        valid: true,
        rules: {
          required: [(v) => !!v || 'Este campo es requerido'],
        },
        userEmail: 'admin@gmail.com',
        password: '123456',
        hidePassword: true,
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