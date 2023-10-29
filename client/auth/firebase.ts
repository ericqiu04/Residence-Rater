import firebase from 'firebase/app'
import 'firebase/auth'
import api from './api'

async function fetchFirebaseConfig() {
    try {
        const response = await api.get('/api/firebase-config')
        const firebaseConfig = response.json()

        if (firebaseConfig) {
            firebase.initializeApp(firebaseConfig)
        }
    }
    catch (e) {
        console.log('error fetching firebase config')
    }
}

export const auth = firebase.auth()
export default firebase