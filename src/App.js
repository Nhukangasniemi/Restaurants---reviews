import React, { Component } from 'react';
import './App.css';
import GoogleApiWrapper from "./Map.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sort from "./Sort.js";
import Sidebar from "./Sidebar.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      places: [],
      filterTool: {
        minStar: "",
        maxStar: "",
      }
    }
  }


  getGooglePlaces = (places) => {
    this.setState({
      places: places
    })
    return console.log(this.state.places[0].opening_hours.open_now);
  };

  handleFilter = (name, value) => {
    this.setState({
      filterTool: {
        [name]: value,
      }
    })
  }


   //Fetch restaurants from local JSON file
  componentDidMount() {
   import('./Restaurants.json')
   .then((data) => {
     this.setState({restaurants: data})
   })}  
   

  render() {

    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Restaurant Reviews</h1>
        </header>
        <div style={{display: 'flex', height: '100vh'}}>
          <div style={{width: '70%'}}>
            <GoogleApiWrapper myRestaurants={this.state.restaurants} 
              googlePlaces={this.getGooglePlaces} places={this.state.places}
              currentLocation={this.state.currentLocation}
              onFilter={this.handleFilter}/>
          </div>
          <div style={{width: '25%',height: 'inherit',
            border: '1px solid green',margin: '0 auto'}}>
            <Sort googlePlaces = {this.state.places}
              myRestaurants={this.state.restaurants}
              onFilter={this.handleFilter}
              minStar={this.state.filterTool.minStar}
              maxStar={this.state.filterTool.maxStar}/>
            <Sidebar id='resultCards'
              googlePlaces = {this.state.places}
              myRestaurants={this.state.restaurants}
              onFilter={this.handleFilter}/>
          </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
