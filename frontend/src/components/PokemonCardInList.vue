<template>
  <div>
    <div v-if="pokemon" v-bind:class="[isGridView ? 'card ' : 'listPoke']">
      <div class="pokemonDetails">
        <router-link v-bind:to="'/' + pokemon.id"
          ><img :src="pokemon.image" alt=""
        /></router-link>

        <router-link v-bind:to="'/' + pokemon.id"
          ><h3>{{ pokemon.name }}</h3></router-link
        >
      </div>

      <div class="details">
        <div v-if="isGridView" class="types">
          <div v-for="type in pokemon.types" :key="type" class="type">
            <h5>{{ type }}</h5>
          </div>
        </div>

        <div class="extras">
          <div class="favorite">
            <i
              v-bind:class="[
                isFavorite === true ? 'fas fa-heart' : 'far fa-heart',
              ]"
              @click="setFavorite(pokemon.isFavorite, pokemon.id)"
            ></i>
          </div>
          <div v-if="isGridView" class="quickView">
            <i class="fas fa-eye" @click="showPokemon(pokemon.name)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

    
<script>
export default {
  name: "pokemonCardInList",
  props: ["pokemon", "isFavoritePoke", "isGridView"],
  data() {
    return {
      isFavorite: this.isFavoritePoke,
      pokemonProps: this.pokemon,
    };
  },
  methods: {
    setFavorite(value, id) {
      this.isFavorite = !value;
      this.$emit("setFavorite", this.isFavorite, id);
    },
    showPokemon(value) {
      this.$emit("setPokemonDetails", value);
    },
  },
};
</script>


<style lang="scss" scoped>
.card {
  img {
    width: 250px;
    height: 250px;
  }
  .details {
    display: grid;
    background-color: rgb(241, 238, 238);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 11px;

    .types {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin-left: 20px;
      grid-column-gap: 11px;
    }
    .extras {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin-left: 20px;
      grid-column-gap: 11px;
      .favorite {
        color: red;
        padding: 20px;
        padding-left: 80px;
        font-size: 1.5rem;
      }
      .quickView {
        padding: 18px;
        font-size: 1.5rem;
      }
    }
  }
}
.listPoke {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  grid-gap: 20px;
  max-width: 100%;
  .pokemonDetails {
    margin: 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 90%;

    img {
      width: 50px;
      height: 50px;
    }
    h3 {
      margin: 0;
      padding: 0;
    }
  }
  .details {
    .extras {
      .favorite {
        color: red;
        padding-top: 35px;
        font-size: 2rem;
      }
    }
  }
}
</style>