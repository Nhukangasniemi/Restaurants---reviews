import React from 'react';
import RestaurantCard from './RestaurantCard.js'

class Sidebar extends React.Component {


    render() {
        let googlePlacesCards = [];
        this.props.googlePlaces.map(place => {
            place.lat = place.geometry.location.lat();
            place.lng = place.geometry.location.lng();
            googlePlacesCards.push(<RestaurantCard 
                key={place.id} 
                name={place.name}
                placeId={place.place_id}
                imageSrc={place.photo}
                rating={this.props.showStars(place.rating)}
                showStars={this.props.showStars}
                google={this.props.google}
                map={this.props.map}
                geometry={{
                    lat: place.lat,
                    lng: place.lng
                }}
            />)
            return place
            });

        return (
            <div style={{height: '85vh',overflowY: 'scroll'}}>
                <div>{googlePlacesCards}
                </div>
                <div>{this.props.myRestaurants.map(res => 
                    <RestaurantCard 
                    key={res.restaurantName} 
                    name={res.restaurantName}
                    placeId={""}
                    isMyRes={true}
                    imageSrc={res.imageSrc}
                    resReviews={res.reviews}
                    rating={this.props.showStars(res.rating)}
                    showStars={this.props.showStars}
                    google={this.props.google}
                    map={this.props.map}
                    geometry={{
                        lat: res.lat,
                        lng: res.lng
                    }} 
                    />)
                }
                </div>
            </div>
        )
    }
}

export default Sidebar;