import firebase from "firebase/app";
import 'firebase/auth'
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
