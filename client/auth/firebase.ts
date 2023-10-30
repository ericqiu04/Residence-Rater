import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import api from './api'

const fetchConfig = async () => {
    try {
        const response = await api.get('/api/firebase-config'); // Note the 'await' here
        const { apiKey, appId, authDomain, messagingSenderId, projectId, storageBucket } = response.data.config;
        const firebaseConfig = {
            apiKey,
            appId,
            authDomain,
            messagingSenderId,
            projectId,
            storageBucket
        };
        return (firebaseConfig);
    } catch (error) {
        console.error('Error fetching Firebase config:', error);
        throw error; // Optionally rethrow the error
    }
}

export default firebase;
