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
      infoWindowRating: "",
      activeMarker: {},
      selectedPlace: {},
      restaurants: [],
      places: [],
      placesPhoto: []
    };
  }


  componentDidMount() {
    import('./Restaurants.json')
    .then((data) => {
      this.setState({restaurants: data});
    });
  }


  fetchPlaces = (mapProps, map) => this.searchNearby(map, map.center);
    searchNearby = (map) => {
      const {google} = this.props;
      if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          let initialLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            }
          })
        
     
      map.setCenter(initialLocation)
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: initialLocation,
        radius: '1000',
        type: ['restaurant']
      };
  
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ places: results});
      }});
    })
    }}
    
 


onMarkerClick = (props, marker) => { 
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });
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

  

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    };

    let cards = [];
    
    this.state.restaurants.map(res => {
      cards.push(<RestaurantCard 
        key={res.restaurantName} 
        name={res.restaurantName}
        imageSrc={res.imageSrc}
        rating={this.showStars(res.rating)} />);
      return cards;
    });

      this.state.places.map((place) => {
      fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&fields=photo&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`, {
        crossDomain:true,
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify()
      })
      .then(res => res.json())
      .then(data => {
      
      let photos = data.result.photos;
      let photo;
      if(photos) {
        photo = photos[0];
        
        place.photo = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${photo.photo_reference}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
      } else {
        photo = "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png";
        place.photo = photo;
      }
    })
    return place.photo
  })

    const goldStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.1,
      strokeColor: 'gold',
      strokeWeight: 3
    };
  console.log(this.state.places)    


    return (
      <div style={{display: 'flex', height: '100vh'}}>
        <div style={{width: '70%'}}>
          <Map
            style={{
              width: '70vw',
              height: '100vh',
            }}
            google={this.props.google}
            onReady={this.fetchPlaces}
            zoom={14}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.lng
           }}
            center={{
              lat: this.state.currentLocation.lat,
              lng: this.state.currentLocation.lng
            }}
            //onClick={this.onMapClick}
            googlePlaces={this.state.places}
            centerAroundCurrentLocation
          >
            
            <Marker
              onClick={this.onMarkerClick}
              position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}
              name={"Current location"}
              icon={goldStar}
            />

            {this.state.places.map(res =>
              <Marker onClick={this.onMarkerClick}
              title={res.name} 
              position={res.geometry.location}
              name={res.name}
              key={res.id}
              id={res.id}
              imageSrc={res.photo}
              address={res.vicinity}
              rating={res.rating}
              animation={this.state.activeMarker ? (res.name === this.state.activeMarker.title ? '1' : '0') : '0'}
              icon={{
                url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                scaledSize: {width: 35, height: 35}
              }}
              />
            )}

            {this.state.restaurants.map(res =>
              <Marker onClick={this.onMarkerClick}
              title={res.restaurantName} 
              position={{lat: res.lat, lng: res.lng}}
              name={res.restaurantName}
              key={res.restaurantName}
              imageSrc={res.imageSrc}
              rating={res.rating}
              address={res.vicinity}
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
              <div>
                <h2 style={{color: '#FF8C00'}}>{this.state.selectedPlace.name}</h2>
                <p style={{color: '#901010'}}>
                  {this.state.activeMarker.address}
                </p>
                <div>
                <img style={{width: 150, height: 100, 
                display: (this.state.activeMarker.name === "Current location")? 'none': 'visible'}} src={`${this.state.activeMarker.imageSrc}`} alt={'Restaurant'} />
                </div>
              </div>
            </InfoWindow>

          </Map>
        </div>

        <div style={{
          width: '25%',
          height: '100vh',
          border: '1px solid green',
          margin: '0 auto',
          overflow: 'auto'
        }}>
          <Sort />
          <div id='resultCards'>
            <div>{this.state.places.map((place) => 
              <RestaurantCard 
                key={place.id} 
                name={place.name}
                //imageSrc={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${res.geometry.location.lat},${res.geometry.location.lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA&fov=90&heading=235&pitch=10`}
                imageSrc={place.photo}
                rating={this.showStars(place.rating)} />
            )}</div>
            <div>{cards}</div>
          </div>

        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA"
})(MapContainer);