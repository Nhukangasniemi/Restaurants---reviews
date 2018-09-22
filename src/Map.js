import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
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

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    // var goldStar = {
    //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    //   fillColor: 'yellow',
    //   fillOpacity: 0.8,
    //   scale: 1,
    //   strokeColor: 'gold',
    //   strokeWeight: 14
    // };


    return (
      <div>
        <Map
          style={{
            width: "70%",
            height: "500px"
          }}
          google={this.props.google}
          zoom={14}
          center={{
            lat: this.state.currentLocation.lat,
            lng: this.state.currentLocation.lng
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}
            // icon={{
              
            // }}
            name={"Current location"}
          />
          {this.state.restaurants.map(res =>
            <Marker onClick={this.onMarkerClick} 
            position={{lat: res.lat, lng: res.lng}}
            name={res.restaurantName}
            key={res.restaurantName}
            />
          )}


          {/* <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 61.508022915221915, lng: 23.626542821643056}}
    onClick={this.onMarkerClick} />
  <Marker
    name={'Dolores park'}
    position={{lat: 61.511502986191644, lng: 23.609162107226553}}
    onClick={this.onMarkerClick} />
  <Marker />
  <Marker
    name={'Your position'}
    position={{lat: 37.762391, lng: -122.439192}}
    icon={{
      url: "/path/to/custom_icon.png",
    }} /> */}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA",
  v: "3"
})(MapContainer);