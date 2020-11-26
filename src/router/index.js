import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Items from "../views/Items.vue";
import Favorites from "../views/Favorites.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
