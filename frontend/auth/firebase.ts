import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import api from './api'

const getKey = async () => {
    const response = await api.get('firebase_key')
    const key = response.data.config
    return (key)
}

const firebaseKey = await getKey()
const firebaseConfig = {
    apiKey: firebaseKey,
    authDomain: 'ontario-residence-rater.firebaseapp.com',
    projectId: 'ontario-residence-rater',
    storageBucket: 'ontario-residence-rater.appspot.com',
    messagingSenderId: '1067956136255',
    appId: '1:1067956136255:web:6fc048b52889a6cde18b8a',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase;
