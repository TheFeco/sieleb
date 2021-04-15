<template>
  <v-container>
    <v-card>
      <v-card-title class="align-baseline">
        Alumos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        />
        <v-btn text color="primary" @click="agregar" class="ml-2" small
          >Agregar</v-btn
        >
      </v-card-title>
      <!-- :items-per-page="5" -->

      <v-data-table
        :loading="datatable.loading"
        loading-text="Cargando..."
        :headers="headers"
        :items="items"
        :options.sync="datatable.options"
        :footer-props="datatable.footerprops"
        :server-items-length="datatable.total"
      >
        <template v-slot:item.actions="{ item }">
          <IconButton icon="mdi-pencil" @click="editar(item)" />
          <IconButton icon="mdi-delete" @click="eliminar(item)" />
        </template>
      </v-data-table>
    </v-card>

    <Confirm
      v-model="open"
      descripcion="Seguro de querer eliminar el registro"
      @aceptar="aceptar"
    />

    <Modal
      v-model="formulario.open"
      :data="formulario.data"
      @on-aceptar="load"
    />
  </v-container>
</template>

<script>
export default {
  components: {
    IconButton: () => import("@/components/Common/IconButton"),
    Confirm: () => import("@/components/Common/Confirm"),
    Modal: () => import("@/components/Alumnos/Modal"),
  },
  data() {
    return {
      search: "",
      timeout: null,

      datatable: {
        loading: false,
        options: {
          page: 1,
          itemsPerPage: 10,
        },
        footerprops: { "items-per-page-options": [10, 20] },
        "items-per-page-text": "Registros",
        total: 0,
      },

      item: null,
      open: false,

      formulario: {
        open: false,
        data: {},
      },

      headers: [
        { text: "CURP", value: "curp" },
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        {
          text: "Genero",
          align: "start",
          sortable: false,
          value: "genero",
        },
        { text: "", value: "actions", sortable: false, width: "100px" },
      ],
      data: [],
    };
  },
  watch: {
    search() {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.datatable.options.page === 1) this.load();
        else this.datatable.options.page = 1;
      }, 500);
    },
    "datatable.options": {
      handler() {
        this.load();
      },
    },
  },
  computed: {
    items() {
      return this.data.map((v) => ({
        id: v.id,
        curp: v.curp.toUpperCase(),
        nombre: `${v.nombre} ${v.primer_apellido} ${v.segundo_apellido}`.trim(),
        genero: v.genero === 1 ? "Masculino" : "Femenino",
      }));
    },
  },
  methods: {
    async load() {
      try {
        this.datatable.loading = true;
        this.data = [];

        const search = this.search;
        const { page, itemsPerPage } = this.datatable.options;

        const res = await this.$api.alumnos.index({
          search,
          page,
          limit: itemsPerPage,
        });

        this.data = res.data;
        this.datatable["total"] = res.total;
        this.datatable.loading = false;
      } catch (err) {
        this.datatable.loading = false;
      }
    },
    agregar() {
      this.formulario = {
        open: true,
        data: {},
      };
    },
    editar(data) {
      const row = this.data.find((v) => v.id === data.id);

      this.formulario = {
        open: true,
        data: row,
      };
    },
    eliminar(data) {
      this.item = data;
      this.open = true;
    },
    async aceptar() {
      try {
        const { id } = this.item;
        this.$api.alumnos.delete(id);
        this.item = null;
        this.open = false;
        this.search = "";
        this.datatable.options.page = 1;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
