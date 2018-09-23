import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Sort from "./Sort.js";
import RestaurantCard from "./RestaurantCard.js";
//import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: null,
        lng: null,
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      restaurants: []
    };
  }

  componentWillMount() {
    import('./Restaurants.json')
    .then((data) => {
      this.setState({restaurants: data});
    })
  }

  componentDidMount() {
    if(navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          }
        })
      })
    }
  }

  onMarkerClick = (props, marker) => { 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(this.state.selectedPlace);
  }

  // onMapClick = () => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // }
  showStars = (avgRating) => {
    let stars;
    switch(avgRating) {
      case 0:
        stars = "☆☆☆☆☆";
        break;
      case 1: 
        stars = "★☆☆☆☆";
        break;
      case 2: 
        stars = "★★☆☆☆";
        break;
      case 3: 
        stars = "★★★☆☆";
        break;
      case 4: 
        stars = "★★★★☆";
        break;
      case 5: 
        stars = "★★★★★";
        break;
      default:
        stars = "";
    }
    return stars;
  };
  

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    };

    let rating = this.showStars(this.state.activeMarker.avgRating); 
    let cards = [];
    this.state.restaurants.map(res => {
      cards.push(<RestaurantCard 
        key={res.restaurantName} 
        name={res.restaurantName}
        imageSrc={res.imageSrc}
        rating={this.showStars(res.avgRating)} />);
      return cards;
    });

    const goldStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.1,
      strokeColor: 'gold',
      strokeWeight: 3
    };
    


    return (
      <div style={{display: 'flex', height: '100vh'}}>
        <div style={{width: '70%'}}>
          <Map
            style={{
              width: '70vw',
              height: '100vh',
            }}
            google={this.props.google}
            zoom={14}
            center={{
              lat: this.state.currentLocation.lat,
              lng: this.state.currentLocation.lng
            }}
            //onClick={this.onMapClick}
          >
            <Marker
              onClick={this.onMarkerClick}
              position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}
              name={"Current location"}
              icon={goldStar}
              //animation={this.props.google.maps.Animation.BOUNCE}
            />
            {this.state.restaurants.map(res =>
              <Marker onClick={this.onMarkerClick}
              title={res.restaurantName} 
              position={{lat: res.lat, lng: res.lng}}
              name={res.restaurantName}
              key={res.restaurantName}
              imageSrc={res.imageSrc}
              avgRating={res.avgRating}
              animation={this.state.activeMarker ? (res.restaurantName === this.state.activeMarker.title ? '1' : '0') : '0'}
              icon={{
                url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                scaledSize: {width: 35, height: 35}
              }}
              />
            )}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div style={{color: '#FF8C00'}}>
                <h1>{this.state.selectedPlace.name}</h1>
                <div className="rating">
                  {rating}
                </div>
                <img style={{width: 200, height: 150, 
                display: (this.state.activeMarker.name === "Current location")? 'none': 'visible'}} src={`${this.state.activeMarker.imageSrc}`} alt={'Restaurant'} />
              </div>
            </InfoWindow>
          </Map>
        </div>

        <div style={{
          width: '27%',
          height: '100vh',
          border: '1px solid green',
          margin: '0 auto',
          overflow: 'auto'
        }}>
          <Sort />
          <div id='resultCards'>
            {cards}
          </div>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA",
  v: "3"
})(MapContainer);