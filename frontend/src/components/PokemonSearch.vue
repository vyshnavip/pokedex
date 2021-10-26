<template>
  <div class="searchbar">
    <form @submit.prevent="setPokemonUrl">
      <input type="text"  v-model="input" placeholder="Search">
    </form>
  </div>
</template>

<script>

  export default {
    data: () => {
      return {
        searchvalue: '',
        timeout:""
      }
    },
   computed: {
    input: {
      get() {
        return this.searchvalue;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.searchvalue = val;
          this.$emit('setPokemon', this.searchvalue);
        }, 300);
          
      }
    }
  }
  }
</script>




<style lang="scss" scoped>
  .searchbar {
    position: relative;
    width: 150%;
    max-width: 810px;
    padding-bottom: 20px;
    text-align: center;
    

    input {
      border: none;
      outline: none;
      border-radius: 2px;
      background-color: rgb(241, 238, 238);
      
      padding: 10px 40px 10px 10px;
      width: calc(100% - 50px);
      font-size: 1rem;
    
    }
  }
</style>
