import React, { Component } from 'react';
import './App.css';
import GoogleApiWrapper from "./Map.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Sort from "./Sort.js";
// import Sidebar from "./Sidebar.js";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Restaurant Reviews</h1>
        </header>
        <div>
          <GoogleApiWrapper />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
