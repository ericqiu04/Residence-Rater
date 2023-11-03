import { Component } from "react";
import api from "@/auth/api";
import Cookies from "js-cookie";
//Routing
import { withRouter } from "next/router";
import {RouterProps} from "@/data/props";
import Link from "next/link";
import {RegisterState} from "@/data/state";
//Auth
import 'firebase/auth';
import firebase from "@/auth/firebase";



class Register extends Component<RouterProps, RegisterState> {
  constructor(props: RouterProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: null,
      emailTaken: false,
      weakPassword: false
    };
  }

  handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { email, username, firstName, lastName, password } = this.state;
    try {
      this.setState({emailTaken: false, weakPassword: false})
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = firebase.auth().currentUser
      user?.updateProfile({
        displayName: username
      })

      if (user) {
        const token = await user.getIdToken();
        await this.handleVerify(token)
      }
    }
    catch (e:any) {
      if (e.code === "auth/email-already-in-use") {
        this.setState({emailTaken: true})
      }
      else if(e.code === "auth/weak-password"){
        this.setState({weakPassword: true})
      }
      else {

      }
    }
  };

  handleVerify = async(token:any) => {
    const data = {
      token: token
    }
    const response = await api.post('verify_token/', data, {
      headers: {'Content-Type': 'application/json'}
    })
  
    if (response.status == 200) {
      Cookies.set("idToken", token, {expires: 14})
      Cookies.set('email', this.state.email)
      this.props.router.push('/universities')
      const delayMilliseconds = 500;
      setTimeout(() => {
        this.props.router.reload();
      }, delayMilliseconds);
    }
 
  }

  render() {
    const {emailTaken, weakPassword} = this.state
    return (
      <>
        <div className="min-h-[70vh] flex items-center justify-center text-customDefault">
          <div className="bg-white p-8 w-2/3 lg:w-1/2 2xl:w-1/3 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Register
            </h2>
            <form onSubmit={() => this.handleRegister}>
              {/** email */}
              
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
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              {/** username */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full input input-bordered rounded-lg"
                  placeholder="username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              {/** first + last name */}
              <div className="mb-4 flex flex-row space-x-7">
                <div className="w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full input input-bordered rounded-lg"
                    placeholder="first name"
                    onChange={(e) =>
                      this.setState({ firstName: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full input input-bordered rounded-lg"
                    placeholder="last name"
                    onChange={(e) =>
                      this.setState({ lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              {/** password */}
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
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              {emailTaken ? (<div className = "text-center text-red-600 mb-2">
                *Email is Taken
              </div>) : (<>
              
              </>)}

              {weakPassword ? (<div className = "text-center text-red-600 mb-2">
                *Password too short
              </div>) : (<>
              
              </>)}
              {/** button */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <button
                  onClick={this.handleRegister}
                  className="btn btn-info px-10 py-3 flex"
                >
                  Register
                </button>
                <Link href="/authentication/login" className="text-gray-500">
                  have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Register);
