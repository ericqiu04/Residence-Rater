import { Component } from "react";

type registerState = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password:any
}
class Register extends Component<{}, registerState> {
    constructor(props:any) {
        super(props)
        this.state = {
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            password: null,
        }
    }
    
    handleRegister = () => {
        const {email, username, firstName, lastName, password} = this.state
    }   

  render() {
    return (
      <>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white p-8 w-1/3 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
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
                  onChange = {(e) => this.setState({email: e.target.value})}
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
                  onChange = {(e) => this.setState({username: e.target.value})}

                />
              </div>
              {/** first + last name */}
              <div className="mb-4 flex flex-row space-x-5">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full input input-bordered rounded-lg"
                    placeholder="first name"
                    onChange = {(e) => this.setState({firstName: e.target.value})}

                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full input input-bordered rounded-lg"
                    placeholder="last name"
                    onChange = {(e) => this.setState({lastName: e.target.value})}

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
                  onChange = {(e) => this.setState({password: e.target.value})}

                />
              </div>
              {/** button */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <button onClick ={this.handleRegister} className="btn btn-info px-10 py-3 flex">
                  Register
                </button>
                <a href="/authentication/login" className="text-gray-500">
                  have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
