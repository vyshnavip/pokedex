<template>
  <div id="pokemon" class="container">
    <div class="inputsForFilter">
      <PokemonSearch v-if="page === 'Home'" @setPokemon="setPokemon" />
      <PokemonTypes
        v-if="page === 'Home'"
        :types="types"
        @setPokemonTypes="setPokemonTypes"
      />

      <div v-if="page === 'Home'" class="buttons">
        <div class="list">
          <i class="fa fa-th-large fa-2x" @click="switchViewList()"></i>
        </div>
        <div class="grid">
          <i class="fa fa-list fa-2x" @click="switchViewGrid()"></i>
        </div>
      </div>
    </div>
    <PokemonListView
      :pokemons="pokemons"
      :isGridView="isGridView"
      @setPokemonList="setPokemonList"
      :limit="limit"
      @setFavorite="setFavorite"
      @setPokemonDetails="setPokemonDetails"
      :page="page"
    />
    <PokemonQuickView
      v-if="showDetail"
      :pokemon="pokemon"
      :readyToShow="readyToShow"
      @closeDetail="closeDetail"
    />
  </div>
</template>

<script>
import axios from "axios";
import PokemonSearch from "@/components/PokemonSearch.vue";
import PokemonTypes from "@/components/PokemonTypes.vue";
import PokemonQuickView from "@/components/PokemonQuickView.vue";
import PokemonListView from "@/components/PokemonListView.vue";

export default {
  name: "pokemonListView",
  props: ["page"],
  components: {
    PokemonListView,
    PokemonSearch,
    PokemonTypes,
    PokemonQuickView,
  },
  data() {
    return {
      pokemons: [],
      limit: 10,
      searchvalue: "",
      types: [],
      selectedtype: "",
      query: "",
      showDetail: false,
      pokemon: [],
      readyToShow: true,
      isGridView: true,
      viewType: "list",
    };
  },
  methods: {
    switchViewList: function () {
      if (this.viewType !== "list") {
        this.isGridView = !this.isGridView;
        this.viewType = "list";
      }
    },
    switchViewGrid: function () {
      if (this.viewType !== "grid") {
        this.isGridView = !this.isGridView;
        this.viewType = "grid";
      }
    },
    setPokemonDetails(value) {
      this.showDetail = true;
      this.getPokemonDetails(value);
    },
    setFavorite(value, id) {
      this.setFavoritePokemon(value, id);
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
    setPokemonUrl() {
      this.showDetail = true;
    },
    setPokemon(value) {
      this.searchvalue = value;
      this.limit = 10;
      this.fetchData();
    },
    setPokemonTypes(value) {
      this.selectedtype = value;
      this.limit = 10;
      this.fetchData();
    },
    setPokemonList(value) {
      this.limit = value;
      this.fetchData();
    },
    getPokemonDetails(value) {
      axios({
        method: "POST",
        url: "http://192.168.86.146:4000/graphql",
        data: {
          query: `query{pokemonByName(name:"${value}"){id name isFavorite image classification types attacks{fast{name type damage} special{name type damage}} weight{minimum maximum} height{minimum maximum}}}`,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            this.readyToShow = true;
            this.pokemon = result.data.data.pokemonByName;
            console.log("hello" + this.pokemon);
          }
        })
        .catch((err) => {
          //err
        });
    },
    fetchData() {
      let query =
        this.selectedtype != ""
          ? `query { pokemons(query: { limit: ${this.limit}, offset: 0, search: "${this.searchvalue}" , filter:{type:"${this.selectedtype}" isFavorite:false}}) { edges { id name types image  isFavorite } } }`
          : this.page === "Home"
          ? `query { pokemons(query: { limit: ${this.limit}, offset: 0, search: "${this.searchvalue}"}) { edges { id name types image  isFavorite } } }`
          : `query { pokemons(query: { limit: ${this.limit}, offset: 0, filter:{ isFavorite:true}}) { edges { id name types image  isFavorite } } }`;

      axios({
        method: "POST",
        url: "http://192.168.86.146:4000/graphql",
        data: {
          query: query,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            this.limit = this.limit + 10;
            this.pokemons = result.data.data.pokemons.edges;
            console.log(this.pokemons);
          }
        })
        .catch((err) => {});
    },
    closeDetail() {
      this.showDetail = false;
    },
    fetchTypes() {
      axios({
        method: "POST",
        url: "http://192.168.86.146:4000/graphql",
        data: {
          query: `query{pokemonTypes}`,
        },
      })
        .then((result) => {
          if (result.status == 200) {
            this.types = result.data.data.pokemonTypes;
          }
        })
        .catch((err) => {
          //err
        });
    },

    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.limit > 10) {
            this.fetchData();
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
  },
  created() {
    this.fetchData();
    this.fetchTypes();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Acme");
.container {
  margin: 0px 30px 30px 30px;
  width: 100%;
  .inputsForFilter {
    display: flex;
    flex-direction: row;
    width: 75%;
    padding-left: 30px;
    padding-top: 20px;

    .buttons {
      display: flex;
      text-align: center;
      div {
        margin: 0px 10px;
        cursor: pointer;
        i {
          color: #42b983;
        }
      }
      .buttons div > * {
        pointer-events: none;
      }
    }
  }
}

h1 {
  color: #080808;
}
</style>
