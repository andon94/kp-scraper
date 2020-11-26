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

let osprey = "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=patagonia&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=osprey";
let fjallravenL = "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=patagonia+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=fjallraven+l";
let scarpa45 = "https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=fjallraven+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=scarpa+45";
let mammut45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=mammut+45'
let millet45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=millet+45'
let salewa45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=salewa+45'
let columbia45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=columbia+45'
let haglofs45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=haglofs+45'
let garmont45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=garmont+45'
let bergans45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=bergans+45'
let arcteryx45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=arcteryx+45'
let marmot45 = 'https://www.kupujemprodajem.com/search.php?action=list&data%5Bpage%5D=1&data%5Bprev_keywords%5D=mammut+xl&data%5Border%5D=posted+desc&submit%5Bsearch%5D=Tra%C5%BEi&dummy=name&data%5Bkeywords_scope%5D=description&data%5Bkeywords%5D=marmot+45'




let arr = [osprey, fjallravenL, scarpa45, mammut45, millet45, salewa45, columbia45, haglofs45, garmont45, bergans45, scarpa45, arcteryx45, marmot45]


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
      item.time = firebase.firestore.FieldValue.serverTimestamp()
      collection
        .where("link", "==", item.link)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length == 0) {
            collection.add(item).then(() => console.log("sent"));
          } else{
            console.log('exists in database')
          }
        })
        .catch(err => console.log(err))
    });
  })();
});
