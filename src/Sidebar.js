import React from 'react';
import RestaurantCard from './RestaurantCard.js'

class Sidebar extends React.Component {
    
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
            <div>
                <div>{this.props.googlePlaces.map(place => 
                    <RestaurantCard 
                    key={place.id} 
                    name={place.name}
                    //imageSrc={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${res.geometry.location.lat},${res.geometry.location.lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA&fov=90&heading=235&pitch=10`}
                    imageSrc={place.photo}
                    rating={this.showStars(place.rating)} />
                )}
                </div>
                <div>{this.props.myRestaurants.map(res => 
                    <RestaurantCard 
                    key={res.restaurantName} 
                    name={res.restaurantName}
                    imageSrc={res.imageSrc}
                    rating={this.showStars(res.rating)} />)
                }

                </div>
            </div>
        )
    }
}

export default Sidebar;