import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state: {
    username: null,
    password: null
  };

  handleForm = e => {
    e.preventDefault();
    const data = {};
    data.username = this.state.username;
    data.password = this.state.password;
    fetch("/login", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };
  handleUserName = e => {
    this.setState({
      username: e.target.value
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <hr />
        <form>
          <h1>Username</h1>
          <input onChange={e => this.handleUserName(e)} />
          <h1>Password</h1>
          <input type="password" onChange={e => this.handlePassword(e)} />
          <br />
          <br />
          <button onClick={e => this.handleForm(e)}>login</button>
        </form>
        <hr />
      </div>
    );
  }
}

export default App;
