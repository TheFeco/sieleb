<template>
  <v-container>
    <v-card>
      <v-card-title>
        Examenes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <router-link
        :to="{name: 'nuevo'}" 
        tag="v-btn"
      >
        <v-btn text color="primary" class="ml-2" small
          >Agregar</v-btn
        >
      </router-link>
        
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:item.actions="{item}">
          <IconButton icon="mdi-pencil" @click="editar(item)"/>
          <IconButton icon="mdi-delete" @click="eliminar(item)"/>
        </template>
      </v-data-table>
  </v-card>

  <Confirm
    v-model="open"
    descripcion="Seguro de querer eliminar el registro"
    @aceptar="aceptar"
  />
  </v-container>
</template>

<script>
  export default {
    components: {
      IconButton: () => import('@/components/Common/IconButton'),
      Confirm: () => import('@/components/Common/Confirm'),
    },
    data () {
      return {
        search: '',
        item: null,
        open: false,

        headers: [
          { text: 'CTT', value: 'calories' },
          {
            text: 'Nombre',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '', value: 'actions', sortable: false, width: '100px' },
        ],
        desserts: [
          { name: 'Frozen Yogurt', calories: 159,},
          { name: 'Ice cream sandwich', calories: 237,},
          { name: 'Eclair', calories: 262,},
          { name: 'Cupcake', calories: 305,},
          { name: 'Gingerbread', calories: 356,},
          { name: 'Jelly bean', calories: 375,},
          { name: 'Lollipop', calories: 392,},
          { name: 'Honeycomb', calories: 408,},
          { name: 'Donut', calories: 452,},
          { name: 'KitKat', calories: 518,},
        ],
      }
    },
    methods: {
      editar(data){ console.log(data)},
      eliminar(data){ 
        this.item = data
        this.open = true
      },
      aceptar(){
        this.item = null
        this.open = false
      }
    }
  }
</script>