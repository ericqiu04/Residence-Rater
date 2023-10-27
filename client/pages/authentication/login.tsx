import { Component } from "react";
import axios from 'axios'
import authManager from "@/auth/useAuth";
import { NextRouter, withRouter } from "next/router";
type LoginState = {
  username: string,
  password: string
}
type LoginProps = {
  router:NextRouter
}
class Login extends Component<LoginProps, LoginState> {
  api:any
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }
  
  handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const {username, password} = this.state
    await authManager.login({username, password})
    this.props.router.push("/")
  };


  render() {
    return (
      <>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white p-8 w-2/3 lg:w-1/2 2xl:w-1/3 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit = {this.handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  E-Mail
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full input input-bordered rounded-lg"
                  placeholder="youremail@example.com"
                  onChange = {(e) => this.setState({username: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full input input-bordered rounded-lg"
                  placeholder="Password"
                  onChange = {(e) => this.setState({password: e.target.value})}
                />
              </div>
              <div className="flex flex-col items-center justify-center space-y-3">
                <button
                  className="btn btn-info px-10 py-3 flex"
                  onClick = {this.handleLogin}
                >
                  Login
                </button>
                <a href = "/authentication/register" className = "text-gray-500">create new account</a>

              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
