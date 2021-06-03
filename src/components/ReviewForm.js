import React, { Component } from 'react'



//props: addReview
export default class ReviewForm extends Component {

    state ={
        name:'',
        review: ''
    }

    handleSubmit = (evt)=>{
        evt.preventDefault()
        const newArr = [...this.props.game.reviews, this.state]
        fetch(`http://localhost:4000/games/${this.props.game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviews: newArr
            }),
            })
            .then((r) => r.json())
            .then((gameObj) => {
                this.props.showForm()
                console.log(gameObj.reviews[gameObj.reviews.length - 1])
                this.props.addReview(gameObj.reviews[gameObj.reviews.length - 1])
                this.setState({
                    name: '',
                    review: ''
                })
            });
    }


    handleChange = (evt)=>{
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Enter Name' name='name' onChange={this.handleChange} value={this.state.name}/>
                <input type='text' placeholder='Review...' name='review' onChange={this.handleChange} value={this.state.review}/>
                <input type='submit' />
            </form>
        )
    }
}