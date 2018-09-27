import React from 'react';

class RestaurantCard extends React.Component {
    render() {
        return (
        
            <div className='card'>
                <div className="restaurantDetail">
                    <p><a style={{fontSize: '1.2em', color: '#FF8C00'}} href="">{this.props.name}</a></p>
                    <p>{this.props.rating}</p>
                </div>
                <div className="product-image">
                    <img style={{width: '150px', height: '100px'}} src={this.props.imageSrc} alt='Restaurant'/>
                </div>
                
            </div>
        
        )
    }
}

export default RestaurantCard