import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
  width: '85%',
  maxWidth: 'none'
};

const origin = {author_name: "", rating: "", text: ""};

export default class DialogBox extends React.Component {
  state = {
    open: false,
    reviews: [],
    comment: Object.assign({}, origin),
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (e) => {
    const field = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => {
      prevState.comment[field] = value;
      return {comment: prevState.comment} 
    })
  }

  handleComment = (e) => {
    this.props.cardReviews.push(this.state.comment);
    this.setState({
      comment: Object.assign({}, origin)
    })
    e.preventDefault();
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    let cardReviews = [];
    if(this.props.cardReviews) {
      this.props.cardReviews.map(review => {
        let reviewRating = this.props.showStars(review.rating);
        cardReviews.push(<div className="review" key={review.author_name}>
          <div className="author">
            <p>{review.author_name}</p>
            <p>{reviewRating}</p>
          </div>
          <div className="textReview">{review.text}</div>
      </div>);
      return cardReviews;
      });
    }

    return (
      <div>
        <RaisedButton className="infoButton" label="More Info" onClick={this.handleOpen} />
        <Dialog
        style={{textAlign: 'center', color: '#990014'}}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        repositionOnUpdate={true}
          title={this.props.name}
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
            <div className="dialogBox">
                <div className="streetView">
                  <h3>Street View</h3>
                  <img src={this.props.streetView} alt="streetView" />
                  <h3>Leave Your Comment Here</h3>
                  <form className="dropReview">
                    <label htmlFor="author_name">Author:</label> <br />
                    <input type="text" id="author" name="author_name" 
                    value={this.state.comment.author_name}
                    onChange={this.handleChange}/> <br />
                    <label htmlFor="rating">Overall Rating</label> <br />
                    <input type="text" id="rating" name="rating" placeholder="From 1-5" 
                    value={this.state.comment.rating}
                    onChange={this.handleChange}/> <br />
                    <label htmlFor="text">Comment</label> <br />
                    <textarea type="text" id="comment" name="text" 
                    value={this.state.comment.text}
                    onChange={this.handleChange}></textarea> <br /> <br/>
                    <RaisedButton className="infoButton" label="Submit" onClick={this.handleComment} />
                  </form>
                </div>
                <div className="customerReview">
                  <h3>Customer Reviews</h3>
                  <div>
                   {cardReviews}
                  </div>
                </div>
            </div>
        </Dialog>
      </div>
    );
  }
}