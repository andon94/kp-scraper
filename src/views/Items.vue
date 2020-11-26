<template>
  <div class="items">
    <div class="length" v-if="items">
      Broj proizvoda: <span>{{ items.length }}</span> Checked:
      <span>{{ checked }}</span> Favorited: <span>{{ favorited }}</span>
    </div>
    <div class="item" v-for="(item, i) in items" :key="i">
      <div v-if="!item.checked">
        <div class="item-header">
          <div class="img"><img :src="item.image" :alt="item.title" /></div>
          <div
            class="title"
          >
            <a :href="item.link" v-bind:class="{ color2: item.favorite }">{{ item.title }}</a>
          </div>
          <div class="price">{{ item.price }}</div>
        </div>
        <div class="item-columns">
          <div class="item-main">
            <div>
              <div class="posted">{{ toDateTime(item.time.seconds) }}</div>
              <div class="add-info">
                <div class="city">{{ item.city }}</div>
                <div class="view">{{ item.view }}</div>
              </div>
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
      </div>
      <div v-if="item.checked" class="checked-div">
        <div class="checked-info">
          <div class="checked-title">{{item.title}}</div>
          <div class="checked-price">{{item.price}}</div>
        </div>
        <div class="checked-button" @click="uncheckItem(item)">
          <img :src="check" alt="check" />
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
    uncheckItem(item) {
      db.collection("items")
        .doc(item.id)
        .update({
          checked: false,
        })
        .then(() => {
          console.log("checked");
          item.checked = false;
        })
        .catch(() => console.log(item));
    },
    toDateTime(secs) {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs)
        return t.toLocaleString("de-AT", {day: "numeric", month: "numeric", year: 'numeric', hour: "numeric", minute: "numeric"});
    }
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

      a {
        text-decoration: none;
        color: var(--blue);
      }

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
      grid-template-columns: 70% 30%;

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
          font-size: 0.75rem;
        }
        .view {
          color: var(--red);
        }
        .add-info{
          display: flex;
          justify-content: space-between;
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

  .checked-div{
    font-size: 0.7rem;
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    padding-bottom: 0.2rem;
    .checked-info{
      display: grid;
      grid-template-columns: 70% 30%;
      .checked-price{
        padding-left: 1rem;
      }
    }
    .checked-button{
      justify-self: end;
      img{
        max-width: 25px;
      }
    }
  }
}
</style>
