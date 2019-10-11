import firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"


var firebaseConfig = {
    apiKey: "AIzaSyC9g0Je3wbZw_n2zx_R4S-Pqr-4OpM-yvA",
    authDomain: "react-native-app-2043a.firebaseapp.com",
    databaseURL: "https://react-native-app-2043a.firebaseio.com",
    projectId: "react-native-app-2043a",
    storageBucket: "",
    messagingSenderId: "31167696122",
    appId: "1:31167696122:web:0b0f4e35cfba6ed6298d43",
    measurementId: "G-M4WE5L24P3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase