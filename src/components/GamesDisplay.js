import React, { Component } from 'react'
import ReviewForm from './ReviewForm'
import YouTube from 'react-youtube'
import { Image } from 'semantic-ui-react'
import Game from './Game'
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

    render() {
        console.log("Inside GamesDisplay: ", this.props.game)
        const matchingGame = this.props.game.find(game=> game.id === this.props.match.params.gameId)
        return (
            <div>
                <Game key={matchingGame === undefined ? null:matchingGame.id} game={matchingGame}/>
            </div>
        )
    }
}

