import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
  removeRefreshToken,
} from "./tokenStorage";
import api from "./api";

type loginData = {
  username: string;
  password: string;
};

type registerData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cPassword: string;
};

class AuthManager {
  isAuthenticated: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const token = getAccessToken();
      this.isAuthenticated = !!token;
    }
  }

  login = async (data: loginData) => {
    try {
      const response = await api.post("login", { data });
      const { accessToken, refreshToken } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (e) {
      console.log(e);
    }

    this.isAuthenticated = true;
  };

  register = async (data: registerData) => {
    try {
      const response = await api.post("register", { data });
      const {accessToken, refreshToken} = response.data
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
    } catch {}
  };

  logout = async () => {
    removeAccessToken();
    removeRefreshToken();
    this.isAuthenticated = false;
  };
}
const authManager = new AuthManager();
export default authManager;
