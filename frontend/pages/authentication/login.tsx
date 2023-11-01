import { Component } from "react";
import axios from 'axios'
import { withRouter } from "next/router";
import Link from "next/link";

import {RouterProps} from "@/data/props";
import {LoginState} from "@/data/state";

class Login extends Component<RouterProps, LoginState> {
  constructor(props: RouterProps) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }
  
  handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const {email, password} = this.state
    
  };


  render() {
    return (
      <>
        <div className="min-h-[70vh] flex items-center justify-center text-customDefault">
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
                  onChange = {(e) => this.setState({email: e.target.value})}
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
                <Link href = "/authentication/register" className = "text-gray-500">create new account</Link>

              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
