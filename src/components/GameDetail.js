import React, { Component } from 'react'
import {Switch, Link, Route} from 'react-router-dom'
import YouTube from 'react-youtube'
import ReviewForm from './ReviewForm'
import { Image } from 'semantic-ui-react'

export default class GameDetail extends Component {
    state={
        likes: this.props.game.likes,
        dislikes: this.props.game.dislikes,
        showForm: false,
        reviews: this.props.game.reviews
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
            </>
        })
    }


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
        {this.state.showForm ? <ReviewForm game={this.props.game} addReview={this.addReview} showForm={this.showForm}/> : null}


        <p>Genres: {this.props.game.genres}</p>
        </>
    }
    render() {
        return (
            <div>
                {this.showAll()}
                <Switch>
                    <Route path={`/games/${this.props.game.id}`} >
                        <Link to='/games'>Back</Link>
                    </Route>
                </Switch>
            </div>
        )
    }
}
