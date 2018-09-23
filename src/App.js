import React, { Component } from 'react';
import './App.css';
import GoogleApiWrapper from "./Map.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Restaurant Reviews</h1>
        </header>
        <div>
          <GoogleApiWrapper />
        </div>
      </div>
    );
  }
}

export default App;
