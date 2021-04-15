<template>
  <component :is="layout"></component>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    default: () => import("@/layouts/default"),
    app: () => import("@/layouts/app"),
  },
  computed: mapState(["layout"]),
};
</script>
