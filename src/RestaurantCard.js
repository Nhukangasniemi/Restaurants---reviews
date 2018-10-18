import React from 'react';
import DialogBox from './DialogBox.js'

class RestaurantCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            realReviews: null,
            photo: null,
            phone: null,
            website: null,
            opening: []
        }
    }

    componentWillMount() {
        if(this.props.placeId) {
        fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.placeId}&fields=photo,reviews,website,opening_hours/weekday_text,formatted_phone_number&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
              .then(res => res.json())
              .then(data => {          
              if(data.result.photos) {
                    this.setState({
                        photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${data.result.photos[0].photo_reference}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
                    })
              } else {
                    this.setState({
                        photo: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png"
                    })
            }
            if(data.result.reviews) {
                this.setState({
                  realReviews: data.result.reviews,
                })
            }
            if(data.result.website) {
                this.setState({website: data.result.website})
            }
            if(data.result.formatted_phone_number) {
                this.setState({phone: data.result.formatted_phone_number})
            }
            if(data.result.opening_hours) {
                this.setState({opening: data.result.opening_hours.weekday_text})
            }
        })
    }}
    

    render() {
        
        const cardReviews = (this.props.isMyRes)? this.props.resReviews: this.state.realReviews;

        return (
            <div className='card'>
                <div className="restaurantDetail">
                    <p style={{fontSize: '1em', color: '#FF8C00'}}><b>{this.props.name}</b><br />
                    {this.props.rating}</p>
                    <DialogBox name={this.props.name} website={this.state.website}
                    cardReviews={cardReviews} showStars={this.props.showStars}
                    placeId={this.props.placeId} phone={this.state.phone} opening={this.state.opening}/>
                </div>
                <div className="product-image">
                    <img style={{width: '100%', height: '110px'}} src={(this.props.isMyRes)? this.props.imageSrc:this.state.photo} alt='Restaurant'/>
                </div>
                
            </div>
        )
    }
}

export default RestaurantCard