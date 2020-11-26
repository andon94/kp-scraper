<template>
  <div class="items">
    <div class="length" v-if="items">
      Broj proizvoda: <span>{{ items.length }}</span>
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
        <div class="remove" @click="removeItem(item)">
          <img :src="removeImg" alt="removeItem" />
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
// import delete from "../assets/delete.png";
import removeImg from "../assets/delete.png";

export default {
  name: "Favorites",
  data() {
    return {
      items: null,
      removeImg,
    };
  },
  created() {
    db.collection("items")
      .where("favorite", "==", true)
      .get()
      .then((snapshot) => {
        const documents = snapshot.docs.map((doc) => {
          let arr = doc.data();
          arr.id = doc.id;
          return arr;
        });
        this.items = documents;
      });
  },
  methods: {
    removeItem(item) {
      db.collection("items")
        .doc(item.id)
        .update({
          favorite: false,
        })
        .then(() => {
          console.log("removed from favorites");
          item.favorite = false;
          this.items = this.items.filter((stateItem) => stateItem != item);
          this.$emit("unfavorited", item);
        })
        .catch(() => console.log(item.id));
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  background-color: var(--light);
  padding: 0 0.4rem;
  min-height: 100vh;

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
      .remove {
        // text-align: center;
        // margin: auto;
        justify-self: end;
        img {
          max-width: 25px;
        }
      }
    }
  }
}
</style>