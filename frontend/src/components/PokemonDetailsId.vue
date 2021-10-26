<template>
  <div class="detail">
    <div class="detail-view">
      <div v-if="pokemon" class="image">
        <img :src="pokemon.image" alt="" />
      </div>
      <div v-if="pokemon" class="data">
        <h2>{{ pokemon.name }}</h2>
        <div class="property">
          <div class="left">
            <i class="fas fa-volume-up" @click="playSound()"> </i>
          </div>
          <div class="right">
            <i
              v-bind:class="[
                isFavorite === true
                  ? 'fas fa-heart favorite'
                  : 'far fa-heart favorite',
              ]"
              @click="setFavoritePokemon(!pokemon.isFavorite, pokemon.id)"
            ></i>
          </div>
        </div>
        <div class="types">
          <div
            class="type"
            v-for="(value, index) in pokemon.types"
            :key="'value' + index"
          >
            {{ value }}
          </div>
        </div>
        <div class="property">
          <div class="left">Height</div>
          <div class="right">
            {{ pokemon.height.minimum }} - {{ pokemon.height.maximum }}
          </div>
        </div>
        <div class="property">
          <div class="left">Weight</div>
          <div class="right">
            {{ pokemon.weight.minimum }} - {{ pokemon.weight.maximum }}
          </div>
        </div>
      </div>
      <h2 v-else>The pokemon was not found</h2>
    </div>
  </div>
</template>



<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "home",
  props: ["id"],
  data() {
    return {
      pokemon: {},
      player: new Audio(),
      isFavorite: false,
    };
  },
  methods: {
    fetchData() {
      axios({
        method: "POST",
        url: "http://192.168.86.146:4000/graphql",
        data: {
          query: `query{pokemonById(id:"${this.id}"){id name isFavorite image sound classification maxCP maxHP types  weight{minimum maximum} height{minimum maximum}}}`,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            this.limit = this.limit + 10;

            this.pokemon = result.data.data.pokemonById;
            this.isFavorite = this.pokemon.isFavorite;
            this.player.src = this.pokemon.sound;
          }
        })
        .catch((err) => {});
    },
    setFavoritePokemon(value, id) {
      let query =
        value === true
          ? `mutation{favoritePokemon(id:"${id}") { id name}}`
          : `mutation{unFavoritePokemon(id:"${id}") { id name}}`;
      axios({
        method: "POST",
        url: "http://192.168.86.146:4000/graphql",
        data: {
          query: query,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            this.fetchData();
            this.pokemon = result.data.PokemonByName;
            console.log(this.pokemon);
          }
        })
        .catch((err) => {
          //err
        });
    },
    playSound() {
      this.player.play();
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1px;
  width: (100%);
  height: (100vh);
  z-index: 1;
  background-color: lightgrey;

  .detail-view {
    z-index: 10;
    height: (100vh);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;

    padding: 50px 0 0;
    background-color: #fff;
    border-radius: 5px;

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50px;
      width: 200px;
      height: 200px;
      background-color: #333;
      overflow: hidden;
      img {
        width: 200px;
        height: 200px;
      }
    }

    h2 {
      text-transform: capitalize;
    }

    .data {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin-bottom: 40px;

      .property {
        width: 90%;
        max-width: 400px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;

        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }

      h3 {
        width: 90%;
        max-width: 400px;
        border-bottom: 1px solid #ccc;
      }

      .types {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 90%;
        max-width: 400px;

        .type {
          margin: 0 10px 10px 0;
          padding: 5px 10px;
          border-radius: 20px;
          color: #0a2e50;
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: capitalize;
          word-wrap: none;
          word-break: keep-all;
        }
      }
    }
  }

  i {
    font-size: 2rem;
    color: black;
  }
  .favorite {
    color: red;
  }
}
</style>
