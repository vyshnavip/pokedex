import Vue from "vue";
import Router from "vue-router";
import All from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "all",
      component: All
    },
    {
      path: "/favorite",
      name: "favorite",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Favorite.vue")
    },
    { path: '/:id', 
    component: () =>
        import(/* webpackChunkName: "about" */ "./views/PokemonDetails.vue")
    }
  ]
});
