import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDJXVjACqHVqGgWeP-P_uJTKb1tDxsXqlI',
  authDomain: 'slack-ktc.firebaseapp.com',
  projectId: 'slack-ktc',
  storageBucket: 'slack-ktc.appspot.com',
  messagingSenderId: '898707712784',
  appId: '1:898707712784:web:cd5655e49d8b64a3631395',
}

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
