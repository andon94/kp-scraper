<template>
  <div class="items">
    <div class="length" v-if="items">
      Broj proizvoda: <span>{{ items.length }}</span> Checked:
      <span>{{ checked }}</span> Favorited: <span>{{ favorited }}</span>
    </div>
    <div class="item" v-for="(item, i) in items" :key="i">
      <div class="item-header">
        <div class="img"><img :src="item.image" :alt="item.title" /></div>
        <div
          class="title"
          v-bind:class="{ color1: item.checked, color2: item.favorite }"
        >
          {{ item.title }}
        </div>
        <div class="price">{{ item.price }}</div>
      </div>
      <div class="item-columns">
        <div class="item-main">
          <div>
            <div class="posted">{{ item.posted }}</div>
            <div class="view">{{ item.view }}</div>
          </div>
          <div class="item-main-div">
            <div class="city">{{ item.city }}</div>
            <div class="link"><a :href="item.link">link do proizvoda</a></div>
          </div>
        </div>
        <div class="item-nav">
          <div class="add" @click="starItem(item)">
            <img :src="star" alt="star" />
          </div>
          <div class="check" @click="checkItem(item)">
            <img :src="check" alt="check" />
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
import star from "../assets/star.png";
import check from "../assets/checked.png";

export default {
  name: "Items",
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      star,
      check,
    };
  },
  methods: {
    starItem(item) {
      db.collection("items")
        .doc(item.id)
        .update({
          favorite: true,
          checked: true,
        })
        .then(() => {
          console.log("updated");
          item.favorite = true;
        })
        .catch(() => console.log(item));
    },
    checkItem(item) {
      db.collection("items")
        .doc(item.id)
        .update({
          checked: true,
        })
        .then(() => {
          console.log("checked");
          item.checked = true;
        })
        .catch(() => console.log(item));
    },
  },
  computed: {
    checked() {
      let arr = [];
      this.items.forEach((item) => {
        item.checked ? arr.push(item) : null;
      });
      return arr.length;
    },
    favorited() {
      let arr = [];
      this.items.forEach((item) => {
        item.favorite ? arr.push(item) : null;
      });
      return arr.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  background-color: var(--light);
  padding: 0 0.4rem;

  .color1 {
    color: rgb(55, 114, 55);
  }

  .color2 {
    color: rgb(138, 138, 26) !important;
  }

  .length {
    padding: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--dark);
    span {
      color: var(--red);
      padding-right: 0.5rem;
    }
  }
  .item {
    padding: 0.5rem;
    .item-header {
      display: grid;
      grid-template-columns: 35% 45% 20%;
      font-weight: bold;
      color: var(--dark);

      .img {
        margin-right: 1rem;
        background-color: var(--blue);
        display: flex;
        img {
          max-height: 100px;
          max-width: 100px;
          margin: auto;
        }
      }

      .price {
        font-size: 0.9rem;
        color: var(--dark);
        padding-left: 1rem;
      }
    }
    .item-columns {
      display: grid;
      grid-template-columns: 50% 50%;

      .item-main {
        display: flex;
        padding-top: 0.2rem;
        font-size: 0.9rem;
        color: var(--blue);

        .item-main-div {
          padding-left: 1rem;
        }

        .posted {
          color: var(--dark);
          font-weight: bold;
        }
        .view {
          color: var(--red);
          font-size: 0.8rem;
        }
        .link {
          font-size: 0.7rem;
          a {
            text-decoration: none;
            color: var(--blue);
          }
        }
      }

      .item-nav {
        padding-left: 1rem;
        display: flex;
        justify-content: flex-end;
        align-self: center;
        .add {
          padding-right: 1rem;
        }
        div {
          img {
            max-width: 25px;
          }
        }
      }
    }
  }
}
</style>
