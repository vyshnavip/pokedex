<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">All</router-link>
      <router-link to="/favorite">Favorite</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 0px 0px 5px 60px;
  text-align: center;
  width: 75%;
  display: flex;
  font-size: 1rem;
  a {
    font-weight: bold;
    color: #42b983;
    padding: 15px;
    width: 50%;
    border: 1px solid #42b983;
    &.router-link-exact-active {
      background-color: #42b983;
      color: #ffffff;
    }
  }
}
@import url("https://use.fontawesome.com/releases/v5.8.2/css/all.css");

body {
  margin: 0;
  padding: 0;
}
</style>
