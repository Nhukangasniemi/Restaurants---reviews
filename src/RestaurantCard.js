import React from 'react';
import DialogBox from './DialogBox.js'

class RestaurantCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            realReviews: null,
            photo: null,
        }
    }

    componentWillMount() {
        if(this.props.placeId) {
        fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.placeId}&fields=photo,reviews&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
              .then(res => res.json())
              .then(data => {
              if(data.result.reviews) {
                  this.setState({
                    realReviews: data.result.reviews,
                  })
              }
              if(data.result.photos) {
                    this.setState({
                        photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${data.result.photos[0].photo_reference}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
                    })
              } else {
                    this.setState({
                        photo: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
                    })
            }
        })
    }}

    render() {
        
        const cardReviews = (this.props.isMyRes)? this.props.resReviews: this.state.realReviews;

        return (
            <div className='card'>
                <div className="restaurantDetail">
                    <p style={{fontSize: '1.2em', color: '#FF8C00'}}>{this.props.name}<br />
                    {this.props.rating}
                    </p>
                    <DialogBox name={this.props.name} streetView={this.props.streetView} 
                    cardReviews={cardReviews} showStars={this.props.showStars}
                    placeId={this.props.placeId}/>
                </div>
                <div className="product-image">
                    <img style={{width: '160px', height: '120px'}} src={this.state.photo} alt='Restaurant'/>
                </div>
                
            </div>
        )
    }
}

export default RestaurantCard