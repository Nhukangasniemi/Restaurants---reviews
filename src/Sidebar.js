import React from 'react';
import RestaurantCard from './RestaurantCard.js'

class Sidebar extends React.Component {


    render() {
        let googlePlacesCards = [];
        this.props.googlePlaces.map(place => {
            googlePlacesCards.push(<RestaurantCard 
                key={place.id} 
                name={place.name}
                placeId={place.place_id}
                imageSrc={place.photo}
                streetView={`https://maps.googleapis.com/maps/api/streetview?size=450x370&location=${place.geometry.location.lat()},${place.geometry.location.lng()}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA&fov=90&heading=235&pitch=10`}
                rating={this.props.showStars(place.rating)}
                showStars={this.props.showStars}
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
                    streetView={`https://maps.googleapis.com/maps/api/streetview?size=450x370&location=${res.lat},${res.lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA&fov=90&heading=235&pitch=10`}
                    resReviews={res.reviews}
                    rating={this.props.showStars(res.rating)}
                    showStars={this.props.showStars} 
                    />)
                }
                </div>
            </div>
        )
    }
}

export default Sidebar;