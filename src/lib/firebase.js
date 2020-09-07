import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB18GkNReDELZTm4eO9-W17Iy0Bbq4atMc",
  authDomain: "mia-drill-builder.firebaseapp.com",
  databaseURL: "https://mia-drill-builder.firebaseio.com",
  projectId: "mia-drill-builder",
  storageBucket: "mia-drill-builder.appspot.com",
  messagingSenderId: "590389287402",
  appId: "1:590389287402:web:8137b4fc2fbace021e3a93"
}

let app, firestore

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
  firestore = app.firestore()
}

export default app
export { firestore }
