import * as firebase from 'firebase';

export default function firebaseInit() {
  firebase.initializeApp({
    apiKey: "AIzaSyCl_Jb42ocA3sIshC3jjahD-4N4sWbrPAg",
    authDomain: "mkreporting-165200.firebaseapp.com",
    databaseURL: "https://mkreporting-165200.firebaseio.com",
    projectId: "mkreporting-165200",
    storageBucket: "mkreporting-165200.appspot.com",
    messagingSenderId: "702897069786"
  });
}