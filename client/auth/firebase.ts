import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import api from './api'

async function fetchFirebaseConfig() {
    const response = await api.get('/api/firebase-config')
    const firebaseConfig = response.data.config
    const app = firebase.initializeApp(firebaseConfig);
    const auth = app.auth()
    return (auth)
}

export const auth = fetchFirebaseConfig()



export default firebase