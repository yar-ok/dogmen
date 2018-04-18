import * as firebase from "firebase";

const config = {
  databaseURL: "https://dogmen-5b44f.firebaseio.com"
};
firebase.initializeApp(config);
export default firebase;
