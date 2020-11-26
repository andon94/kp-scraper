import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {

};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
