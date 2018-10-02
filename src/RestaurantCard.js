import React from 'react';
import DialogBox from './DialogBox.js'

class RestaurantCard extends React.Component {

    render() {
        const cardReviews = (this.props.isMyRes)? this.props.resReviews: this.props.placeReviews

        return (
            <div className='card'>
                <div className="restaurantDetail">
                    <p style={{fontSize: '1.2em', color: '#FF8C00'}}>{this.props.name}<br />
                    {this.props.rating}
                    </p>
                    <DialogBox name={this.props.name} streetView={this.props.streetView} 
                    cardReviews={cardReviews} showStars={this.props.showStars}/>
                </div>
                <div className="product-image">
                    <img style={{width: '160px', height: '120px'}} src={this.props.imageSrc} alt='Restaurant'/>
                </div>
                
            </div>
        )
    }
}

export default RestaurantCard