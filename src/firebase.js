import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAlocJ0o388MsALgF-TsxuLuqDbNeGE7o4",
    authDomain: "slack-clone-rv.firebaseapp.com",
    projectId: "slack-clone-rv",
    storageBucket: "slack-clone-rv.appspot.com",
    messagingSenderId: "984518278227",
    appId: "1:984518278227:web:a63e6c1287c11abe195aa6",
    measurementId: "G-FCN636GYZ8"
};

const app =
    firebase.apps.length === 0 ?
    firebase.initializeApp(firebaseConfig) :
    firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }