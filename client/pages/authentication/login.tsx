import { Component } from "react";

class Login extends Component {
  handleLogin = () => {};

  render() {
    return (
      <>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white p-8 w-2/3 lg:w-1/2 2xl:w-1/3 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form>
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
                />
              </div>
              <div className="flex flex-col items-center justify-center space-y-3">
                <button
                  type="submit"
                  className="btn btn-info px-10 py-3 flex"
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

export default Login;
