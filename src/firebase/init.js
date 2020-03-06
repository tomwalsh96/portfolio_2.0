import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBui7P2E5fTMKOXDLOhVW8KBd4E7iG3cvU',
  authDomain: 'portfolio-d3131.firebaseapp.com',
  databaseURL: 'https://portfolio-d3131.firebaseio.com',
  projectId: 'portfolio-d3131',
  storageBucket: 'portfolio-d3131.appspot.com',
  messagingSenderId: '587772394266',
  appId: '1:587772394266:web:e9a1ef2a15bd716d'
}
const firebaseApp = firebase.initializeApp(config)

// export firebase
export default firebaseApp
