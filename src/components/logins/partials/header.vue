<template>
    <div class="container-fluid" style="background-color: rgba(20, 22, 19, 0.6);">
        <nav class="navbar navbar-expand-lg container p-4" style="background-color: rgba(20, 22, 19, 0.2);">
            <a class="navbar-brand" href="#"><v-icon color="white"  x-large>mdi-clipboard-edit</v-icon> SIELEB <font class='warning--text'>{{this.titulo}} </font>v0.1</a>
        </nav> 
    </div><!--cierra el container-->
</template>
<script>
export default {
    props: {
    titulo: {
      type: String,
      default: 'Plataforma',
    }
  },
}
</script>
<style>
    nav a {text-decoration:none; color:white !important}
</style>