import React from 'react';

class RestaurantCard extends React.Component {
    render() {
        return (
            <div className='card'>
                <div className="restaurantDetail">
                <p style={{fontSize: '1.3em'}}>{this.props.name}</p>
                <p>{this.props.rating}</p>
                </div>
                <div className="product-image">
                <img style={{width: '100%', height: '100%'}} src={this.props.imageSrc} alt='Restaurant'/>
                </div>
            </div>
        )
    }
}

export default RestaurantCard