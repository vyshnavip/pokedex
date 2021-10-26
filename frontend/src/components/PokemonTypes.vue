<template>
  <div class="pokemonTypes">
<form @submit.prevent="setPokemonTypes">
    <select v-model="selectedtype" @change="setPokemonTypes()" ref='dropdownObj' pl>
       <option value="Type" disabled selected>Type</option>
        <option :value="type" v-for="type in types" :key="type" >{{type}}</option>
      </select>
      <i v-if="selectedtype!=='Type'" class="fas fa-window-close" @click="onClick"></i>
      </form>
  </div>
</template>

<script>

  export default {
      props: [
      'types'  
    ],
    data: () => {
      return {
        selectedtype:"Type"
      }
    },
    methods: {
      setPokemonTypes() {
          if(this.selectedtype!="Type")
            this.$emit('setPokemonTypes', this.selectedtype);
          else
          this.$emit('setPokemonTypes', "");
      },
      onClick: function () {
          this.selectedtype ="Type"
            this.$emit('setPokemonTypes',"")
            
        }
      
    },
  }
</script>

<style lang="scss" scoped>
  .pokemonTypes {
    position: relative;
    width: 75%;
    max-width: 510px;
    padding-bottom: 20px;
    text-align: center;

    select {
      border: none;
      outline: none;
      border-radius: 2px;
      background-color: rgb(241, 238, 238);
      padding: 10px 40px 10px 10px;
      width: calc(100% - 50px);
      font-size: 1rem;
      
    }

    i {
      position: absolute;
      top: 10px;
      right: 46px;
      font-size: 1.25rem;
      height: 10px;
      width:10px;
      color: #0A2E50;
      cursor: pointer;
    }
  }
</style>
