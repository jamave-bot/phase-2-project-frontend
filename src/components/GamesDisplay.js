import React, { Component } from 'react'
import ReviewForm from './ReviewForm'
import YouTube from 'react-youtube'
import { Image } from 'semantic-ui-react'
//props: game: the game object
// "id": 1,
// "name": "name",
// "image": "",
// "trailer": "youtube",
// "likes": 23,
// "dislikes": 3,
// "price" : 5,
// "onSale": false,
// "Year": 1964,
// "Reviews": [],
// "Genres": []

export default class GamesDisplay extends Component {
    state={
        showDetails: false,
        likes: this.props.game.likes,
        dislikes: this.props.game.dislikes,
        showForm: false,
        reviews: this.props.game.reviews
    }


    handleClick=()=>{
        this.setState({
            showDetails: !this.state.showDetails
        })
    }


    
    showGame = ()=>{
        return <>
            <p>name: {this.props.game.name}</p>
            <Image src={this.props.game.image} size='small'/>
            <p>price: {this.props.game.price !== 0 ? this.props.game.price: 'Free'}</p>
            <button onClick={this.handleClick}>Show more</button>
        </>
    }

    handleLikes = ()=>{
        let likes = this.state.likes + 1         
        this.setState({
            likes: likes
        })
        fetch(`http://localhost:4000/games/${this.props.game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                likes: likes
            }),
            })
            .then((r) => r.json())
    }

    handleDislikes = ()=>{
        console.log('dislike button pressed')
        let dislikes = this.state.dislikes + 1
        this.setState({
            dislikes: dislikes
        })
        fetch(`http://localhost:4000/games/${this.props.game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dislikes: dislikes
            }),
            })
            .then((r) => r.json())
    }


    showForm = ()=>{
        this.setState({
            showForm : !this.state.showForm
        })
    }


    addReview = (newReview)=>{
        const newArr = [...this.state.reviews, newReview]
        this.setState({
            reviews: newArr
        })
    }

    showReviews = ()=>{
        return this.state.reviews.map(review =>{
            return <>
                <p>{review.review}</p>
                <p>- {review.name}</p>
                <button>Delete Review </button>
            </>
        })
    }


    // Pauses the video when it loads
    // _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    //   }

    showAll = () =>{
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
      

        return <>
        <p>name: {this.props.game.name}</p>
        <p>image url: <Image src={this.props.game.image} size='medium'/></p>
        <p>price: {this.props.game.price !== 0 ? this.props.game.price: 'Free'}</p>
        <p>trailer: <YouTube videoId={this.props.game.trailer} opts={opts} onReady={this._onReady} />  </p>


        {/* LIKES ND DISLIKES ARE SEPARATE/WE'RE GONNA SHOW A RATIO  */}
        <p>likes: {this.state.likes} </p>
        <button name='like' onClick={this.handleLikes}>Like</button>

        <p>dislikes: {this.state.dislikes} </p>
        <button name='dislike' onClick={this.handleDislikes}>Dislike</button>

        <p>onSale: {this.props.game.onSale}</p>
        <p>Year: {this.props.game.year} </p>
        <p>Reviews: {this.showReviews()}</p>
        <button onClick={this.showForm}>Add a Review </button>
        {this.state.showForm ? <ReviewForm game={this.props.game} addReview={this.addReview}/> : ""}


        <p>Genres: {this.props.game.Genres}</p>
        <button onClick={this.handleClick}>Show Less</button>
        </>
    }
    
    
    render() {

        return (
            <div>
                {this.state.showDetails ? this.showAll() : this.showGame()}
            </div>
        )
    }
}
