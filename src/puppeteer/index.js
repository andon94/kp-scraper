const firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyCbuuxjYhn6ktp80imfxY96Tsqu3UivDrs",
  authDomain: "kp-scrape.firebaseapp.com",
  databaseURL: "https://kp-scrape.firebaseio.com",
  projectId: "kp-scrape",
  storageBucket: "kp-scrape.appspot.com",
  messagingSenderId: "907340874536",
  appId: "1:907340874536:web:7503bc7e7367afa94bc61d",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
const puppeteer = require("puppeteer");

let patagoniaL =
  "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=patagonia&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=patagonia+l";
let patagoniaXl =
  "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=patagonia+l&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=patagonia+xl";
let osprey =
  "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=patagonia&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=osprey";
let fjallravenL =
  "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=patagonia+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=fjallraven+l";
let fjallravenXl =
  "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=fjallraven+l&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=fjallraven+xl";
let scarpa45 =
  "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=fjallraven+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=scarpa+45";

let arr = [
  patagoniaL,
  patagoniaXl,
  osprey,
  fjallravenL,
  fjallravenXl,
  scarpa45,
];

arr.forEach((pageUrl) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      let titles = document.querySelectorAll(".adName");
      let titleArr = [];
      let linksArr = [];
      titles.forEach((title) => titleArr.push(title.innerText));
      titles.forEach((title) => linksArr.push(title.href));
      let prices = document.querySelectorAll(".adPrice");
      let priceArr = [];
      prices.forEach((price) => priceArr.push(price.innerText));
      let cities = document.querySelectorAll(".locationSec");
      let cityArr = [];
      cities.forEach((city) => cityArr.push(city.innerText));
      let views = document.querySelectorAll(".view-count");
      let viewsArr = [];
      views.forEach((view) => viewsArr.push(view.innerText));
      let postedDates = document.querySelectorAll(".posted-time");
      let postedArr = [];
      postedDates.forEach((posted) => postedArr.push(posted.innerText));
      let images = document.querySelectorAll(".adImgWrapper");
      let imagesArr = [];
      images.forEach((img) => imagesArr.push(img.children[0].src));

      let finalArr = [];

      titleArr.forEach((title, i) => {
        // [i + 1] => city selector in the DOM is shared with a placeholder in the index of 0
        finalArr.push({
          title: title,
          price: priceArr[i],
          city: cityArr[i + 1],
          view: viewsArr[i],
          posted: postedArr[i],
          link: linksArr[i],
          checked: false,
          favorite: false,
          image: imagesArr[i],
        });
      });
      return { finalArr };
    });

    console.log(data);
    await browser.close();

    let collection = firebaseApp.firestore().collection("items");

    data.finalArr.forEach((item) => {
      collection
        .where("link", "==", item.link)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length == 0) {
            collection.add(item).then(() => console.log("sent"));
          }
        });
    });
  })();
});
