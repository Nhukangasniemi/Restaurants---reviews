import React from 'react';
import RestaurantCard from './RestaurantCard.js'

class Sidebar extends React.Component {
    
    componentDidUpdate() {
        console.log("Component Did update")
    }
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

        return (
            <div style={{height: '85vh',overflowY: 'scroll'}}>
                <div>{this.props.googlePlaces.map(place => 
                    <RestaurantCard 
                    key={place.id} 
                    name={place.name}
                    imageSrc={place.photo}
                    streetView={`https://maps.googleapis.com/maps/api/streetview?size=450x370&location=${place.geometry.location.lat()},${place.geometry.location.lng()}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA&fov=90&heading=235&pitch=10`}
                    placeReviews={place.reviews}
                    rating={this.showStars(place.rating)}
                    showStars={this.showStars} />
                )}
                </div>
                <div>{this.props.myRestaurants.map(res => 
                    <RestaurantCard 
                    key={res.restaurantName} 
                    name={res.restaurantName}
                    isMyRes={true}
                    imageSrc={res.imageSrc}
                    streetView={`https://maps.googleapis.com/maps/api/streetview?size=450x370&location=${res.lat},${res.lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA&fov=90&heading=235&pitch=10`}
                    resReviews={res.reviews}
                    rating={this.showStars(res.rating)} 
                    showStars={this.showStars}/>)
                }
                </div>
            </div>
        )
    }
}

export default Sidebar;