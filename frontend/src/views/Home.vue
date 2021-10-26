<template>
  <div class="home">
    <Pokemon :page="page" />
  </div>
</template>

<script>
// @ is an alias to /src
import Pokemon from "@/components/Pokemon.vue";

export default {
  name: "home",
  components: {
    Pokemon,
  },
  data() {
    return {
      page: "Home",
    };
  },
};
</script>
