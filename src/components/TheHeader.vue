<template>
  <header>
    <div class="logo">
      <router-link to="/"><img :src="logo" alt="logo"/></router-link>
    </div>
    <nav>
      <ul>
        <li><router-link to="/items">Svi Proizvodi</router-link></li>
        <li><router-link to="/favorites">Favorites</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import logo from "../assets/cartman.png";

export default {
  name: "TheHeader",
  data() {
    return {
      logo,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 25% 75%;
  background-color: var(--dark);
  .logo {
    padding: 0.5rem;
    img {
      max-width: 90px;
      padding: 0.3rem;
    }
  }
  nav {
    ul {
      list-style-type: none;
      height: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 0.5rem;
      li {
        align-self: center;
        font-size: 1.3rem;
        font-weight: bold;
        color: var(--red);
        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
}
</style>
