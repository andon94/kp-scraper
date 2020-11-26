import firebase from "firebase";
import "firebase/firestore";

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
export default firebaseApp.firestore();
