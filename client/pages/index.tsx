import React, { useState, useEffect } from "react";
import axios from "axios";

interface State {
  name: string;
  password: string;
  email: string;
}
class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
    };
  }

  async handleSubmit(e: any) {
    e.preventDefault();
    axios.post('https://localhost:8000/api/user_login')

  }

  render() {
    return (
      <>
        <div className = "flex h-screen justify-center items-center">
          <form className = "flex flex-row space-x-3" onSubmit = {this.handleSubmit}>
            <input className = "border-black border-2 px-2 rounded-md" placeholder = "name" type = "text" onChange = {(e) => this.setState({name: e.target.value})}/>
            <input className = "border-black border-2 px-2 rounded-md" placeholder = "password" type = "text" onChange = {(e) => this.setState({password: e.target.value})}/>
            <input className = "border-black border-2 px-2 rounded-md" placeholder = "email" type = "email" onChange = {(e) => this.setState({email: e.target.value})} />
            <button className = "border-black border-2 px-2 rounded-md" type = "submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Home