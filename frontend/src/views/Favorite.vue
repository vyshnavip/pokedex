<template>
  <div class="favorite">
    <Pokemon  :page ="page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Pokemon from "@/components/Pokemon.vue";


export default {
  name: "favorite",
  components: {
    Pokemon
  },
  data(){
    return{
      page: "Favorite"
    }
  }
};
</script>