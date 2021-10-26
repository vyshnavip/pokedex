<template>
  <div class="pokemonDetailsId">
    <PokemonDetailsId :id="$route.params.id"/> 
  </div>
</template>


<script>
import PokemonDetailsId from '@/components/PokemonDetailsId';

export default {
  name: "pokemonDetailsId",
  components:{
    PokemonDetailsId
  }
};
</script>
