import React, { Component } from 'react';
import './App.css';
import GoogleApiWrapper from "./Map.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sort from "./Sort.js";
import Sidebar from "./Sidebar.js";
import logo from './logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      places: [],
      placesBeforeFilter: [],
      restaurantsBeforeFilter: []
    }
  }


  getGooglePlaces = (places) => {
    this.setState({
      places: places,
      placesBeforeFilter: places
    })
    return this.state.places;
  };

  showStars = (avgRating) => {
    let stars;
    if(avgRating === '0') {
        stars = "☆☆☆☆☆";
    } else if (avgRating >=1 && avgRating<1.5) {
      stars = "★☆☆☆☆";
    } else if (avgRating >=1.5 && avgRating<2.5) {
      stars = "★★☆☆☆";
    } else if (avgRating >=2.5 && avgRating<3.5) {
        stars = "★★★☆☆";
    } else if (avgRating >=3.5 && avgRating<4.5) {
        stars = "★★★★☆";
    } else if (avgRating >= 4.5) {
        stars = "★★★★★";
    } else {
        stars = "";
    }
    return stars;
  };

  filterFunction = (minStar, maxStar) => {
    if(minStar && maxStar) {
      let googlePlaces = this.state.places;
      let myRestaurants = this.state.restaurants;
      function isFiltered(place) {
        if (Number(minStar) < Number(maxStar) && place.rating*10 >= Number(minStar)*10 && place.rating*10 <= Number(maxStar)*10) {
          return place;
        } else if (Number(minStar) === Number(maxStar) && (place.rating*10) >= (Number(maxStar)*10 -5) && (place.rating*10) <= Number(maxStar)*10)  {
          return place;
        } else {return}
      }
      googlePlaces = googlePlaces.filter(isFiltered)
      myRestaurants = myRestaurants.filter(isFiltered)
      this.setState(prevState => {
        prevState.places = googlePlaces;
        prevState.restaurants = myRestaurants;
        return {places: prevState.places, restaurants: prevState.restaurants}
      })
    return this.state.places
    }}

    clearFilter = () => {
      this.setState({
        places: this.state.placesBeforeFilter,
        restaurants: this.state.restaurantsBeforeFilter,
      })
    }


   //Fetch restaurants from local JSON file
  componentDidMount() {
   import('./Restaurants.json')
   .then((data) => {
     this.setState({
      restaurants: data,
      restaurantsBeforeFilter: data,
      })
   })}  
   

  render() {

    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <div className="App-title">Restaurant Reviews</div>
          <div className="App-title" style={{textAlign: 'left'}}><img style={{width: '90px', height: '80px'}} src={logo}  alt="logo" /></div>
        </header>
        <div>
          <div className="mainContent" style={{width: '70vw', height: 'inherit'}}>
            <GoogleApiWrapper myRestaurants={this.state.restaurants} 
              googlePlaces={this.getGooglePlaces} places={this.state.places}
              showStars={this.showStars}
            />
          </div>
          <div className="mainContent" style={{width: '25vw',height: 'inherit',
            border: '0.5px solid green', margin: '0 3px'}}>
            <Sort googlePlaces = {this.state.places}
              myRestaurants={this.state.restaurants}
              onChange={this.handleChange}
              onFilter={this.filterFunction}
              onClearFilter={this.clearFilter}
            />
            <Sidebar id='resultCards'
              googlePlaces = {this.state.places}
              myRestaurants={this.state.restaurants}
              showStars={this.showStars}
            />
          </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
