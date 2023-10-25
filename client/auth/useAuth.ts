import {createContext, useContext} from 'react'
import {getAccessToken, removeAccessToken, setAccessToken, setRefreshToken, removeRefreshToken} from './tokenStorage'
import api from './api'

class AuthManager {
    isAuthenticated: boolean = false

    constructor() {
        const token = getAccessToken()
        this.isAuthenticated = !!token
    }

    login = async (username:string, password:string) => {
        try {
            const response = await api.post('/api/user_login', {username, password})
            const {accessToken, refreshToken} = response.data

            setAccessToken(accessToken)
            setRefreshToken(refreshToken)

        }
        catch (e) {
            console.log(e)
        }
        
        this.isAuthenticated = true
    }

    logout = async () => {
        removeAccessToken()
        removeRefreshToken()
        this.isAuthenticated = false
    }
    
}
const authManager = new AuthManager()
export default authManager
