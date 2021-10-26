<template>
  <div class="container">
    <div v-bind:class="[isGridView ? 'wrapper ' : 'list']">
      <article v-for="pokemon in pokemons" :key="pokemon.id" class="col">
        <PokemonCard
          :isGridView="isGridView"
          :pokemon="pokemon"
          :isFavoritePoke="pokemon.isFavorite"
          @setFavorite="setFavorite"
          @setPokemonDetails="setPokemonDetails"
        />
      </article>
      <div id="scroll-trigger" ref="infinitescrolltrigger">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  </div>
</template>

    
<script>
import PokemonCard from "@/components/PokemonCardInList.vue";
export default {
  name: "pokemonListView",
  props: ["pokemons", "limit", "isGridView"],
  components: {
    PokemonCard,
  },

  methods: {
    setPokemon() {
      this.limit = 10;
      this.$emit("setPokemonList", this.limit);
    },
    setFavorite(value, id) {
      this.$emit("setFavorite", value, id);
    },
    setPokemonDetails(value) {
      this.$emit("setPokemonDetails", value);
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          console.log(entry.target.id, entry.intersectionRatio);
          if (entry.intersectionRatio > 0 && this.limit > 10) {
            this.$emit("setPokemonList", this.limit);
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
  },
  mounted() {
    this.scrollTrigger();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 3fr));
  width: 100%;
  grid-gap: 20px;
  max-width: 75%;
  .col {
    height: 400px;
    text-align: center;
    text-transform: capitalize;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid black;
    h3 {
      margin: 0;
    }
  }
}
.list {
  grid-template-columns: 1fr;
  .col {
    height: 80px;
    border: 1px solid black;
    width: 75%;
    padding: 5px;
  }
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  font-size: 2rem;
  color: #efefef;
}
</style>