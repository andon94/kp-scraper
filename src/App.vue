<template>
  <div id="app">
    <TheHeader />
    <router-view :items="items" @unfavorited="unfavorited" />
  </div>
</template>

<script>
import db from "./firebase/init";
import TheHeader from "./components/TheHeader";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  data() {
    return {
      items: null,
    };
  },
  methods: {
    fetchItems() {
      db.collection("items")
        .get()
        .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => {
            let arr = doc.data();
            arr.id = doc.id;
            return arr;
          });
          console.log("fetchItems()", documents);
          this.items = documents;
        })
        .catch((err) => console.log(err));
    },
    unfavorited(item) {
      let arr = [];
      this.items.forEach((stateItem) => {
        if (stateItem.id == item.id) {
          stateItem.favorite = false;
        }
        arr.push(stateItem);
      });
      this.items = arr;
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

:root {
  --light: #e8e8e8;
  --red: #f05454;
  --blue: #30475e;
  --dark: #222831;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
</style>
