import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import axios from "axios";

const fetchConfig = async () => {
    try {
        const response = await axios.get('/api/firebase-config')
        const firebaseConfig = response.data
        firebase.initializeApp(firebaseConfig)
    }
    catch (e) {
        console.log(e)
    }
}

fetchConfig()

export const auth = firebase.auth()
