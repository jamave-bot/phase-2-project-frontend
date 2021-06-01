import React, { Component } from 'react'
import ReviewForm from './ReviewForm'
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
            <p>image url: {this.props.game.image} </p>
            <p>price: {this.props.game.price}</p>
            <button onClick={this.handleClick}>Show more</button>
        </>
    }

    //======================================================================
    //pressing like also presses the div which hides the info!!!!!!!!!!!!
    //======================================================================

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
                <p>Review: {review.review}</p>
                <p>Name: {review.name}</p>
                <button>Delete Review </button>
            </>
        })
    }

    showAll = () =>{
        return <>
        <p>name: {this.props.game.name}</p>
        <p>image url: {this.props.game.image} </p>
        <p>price: {this.props.game.price}</p>
        <p>trailer url: {this.props.game.trailer}  </p>


        {/* LIKES ND DISLIKES ARE SEPARATE/WE'RE GONNA SHOW A RATIO  */}
        <p>likes: {this.state.likes} </p>
        <button name='like' onClick={this.handleLikes}>Like</button>

        <p>dislikes: {this.state.dislikes} </p>
        <button name='dislike' onClick={this.handleDislikes}>Dislike</button>

        <p>onSale: {this.props.game.onSale}</p>
        <p>Year: {this.props.game.Year} </p>
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
