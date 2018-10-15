import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Dialog from 'material-ui/Dialog';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      currentLocation: {
        lat: null,
        lng: null,
      },
      reviews: null,
      showingInfoWindow: false,
      infoWindowRating: "",
      activeMarker: {},
      selectedPlace: {},
      getNewLocation: null,
      newRes: {
        newResName: null,
        location: null,
      },
      newResMarker: [],
      addNewRes: false,
    };
  }

  fetchPlaces = (mapProps, map) => {
    this.props.setGoogleandMap(this.props.google, map);
    this.setState({map: map});
    this.searchNearby(map);
  }

  searchNearby = (map) => {
    //Fetch Nearby Restaurant using Google Places API
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
      radius: '900',
      type: ['restaurant']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        return this.props.googlePlaces(results, google, map);
      }
    })
  })}}

  //Show Info Window when user click on Marker
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    }); 
    const {google} = this.props;
    const lat = (props.googleResults? props.position.lat(): props.position.lat);
    const lng = (props.googleResults? props.position.lng(): props.position.lng);
    let sv = new google.maps.StreetViewService();
      const panoDiv = document.getElementById('pano');
      sv.getPanorama({
          location: {lat: lat, lng: lng}, 
          radius: 50
      }, processSVData);
      
      function processSVData(data, status) {
        if (status === 'OK') {
            let panorama = new google.maps.StreetViewPanorama(panoDiv);
            panorama.setPano(data.location.pano);
            panorama.setPov({
                heading: 270,
                pitch: 0
            });
            panorama.setVisible(true);
        }
      }  
  }
  
  //Allow User To Add New Restaurant By Clicking On Map
  onMapClick = (location, map) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }

    this.setState({
      addNewRes: true,
      getNewLocation: location,
    }) 
  }

  //Save Info Of User Action For New Restaurant
  handleNewRes = (e) => {
    this.setState({
      newRes: {
        newResName: e.target.value,
        location: this.state.getNewLocation
      }
    })
    console.log(this.state.newRes.location)
  }

  //Show Marker For New Restaurant After Submit Button
  saveNewRes = (e) => {
    this.setState({
      addNewRes: false});
    e.preventDefault();
    if(this.state.newRes.newResName) { 
    this.setState(prevState => {
      prevState.newResMarker.push(<Marker onClick={this.onMarkerClick}
              title={this.state.newRes.newResName} 
              position={{lat: this.state.newRes.location.lat(), lng: this.state.newRes.location.lng()}}
              name={this.state.newRes.newResName}
              key={this.state.newRes.newResName} imageSrc={"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"}
    />)
    return {newResMarker: prevState.newResMarker}
  })
  }}

  handleClose = () => {
    this.setState({
      addNewRes: false})
    }

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    };

    const goldStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.1,
      strokeColor: 'gold',
      strokeWeight: 3
    };

    return (
      <div style={{position: 'relative', width: '70vw',height: '100vh', paddingLeft: '0px'}}>
          <Map
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
            onClick={(t, map, c) => this.onMapClick(c.latLng, map)}
            googlePlaces={this.state.places}
          >
            
            <Marker
              onClick={this.onMarkerClick}
              position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}
              name={"Current location"}
              icon={goldStar}
            />

            {this.props.places.map(res =>
              <Marker onClick={this.onMarkerClick}
              googleResults={true}
              title={res.name} 
              position={res.geometry.location}
              name={res.name}
              key={res.id}
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

            {this.props.myRestaurants.map(res =>
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
            {this.state.newResMarker}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
            {this.state.showingInfoWindow? 
              <div>
                <h2 style={{color: '#FF8C00'}}>{this.state.selectedPlace.name}</h2>
                <p style={{color: '#FF8C00'}}>{this.props.showStars(this.state.activeMarker.rating)}</p>
                <p style={{color: '#901010'}}>
                  {this.state.activeMarker.address} <br />
                </p>
                <div id="pano" style={{width: '400px', height: '300px'}}></div>
              </div>
              : <div>Not available</div>
            }
            </InfoWindow>

          </Map>

        {this.state.addNewRes?
      <Dialog open={this.state.addNewRes} modal={false} onRequestClose={this.handleClose}>
        <form>
          Add A Restaurant <br/><br/>
          <input placeholder="New Restaurant" type="text" onChange={this.handleNewRes} value={this.state.newRes.name}/> <br/><br/>
          <button onClick={this.saveNewRes} type="Submit" value="Submit">Add Me</button>
        </form>
      </Dialog> : null}

      </div>
    )
  }}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA"
})(MapContainer);