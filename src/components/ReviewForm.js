import React, { Component } from 'react'
import {Form, Input} from 'semantic-ui-react'


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
            <Form onSubmit={this.handleSubmit}>
                <Form.Field >
                    <label>Name</label>
                    <Input type='text' name='name' onChange={this.handleChange} value={this.state.name}/>
                </Form.Field>
                <Form.Field >
                    <label>Review</label>
                    <Form.TextArea type='text' name='review' onChange={this.handleChange} value={this.state.review}/>
                </Form.Field>
                <Form.Button>Submit</Form.Button>
            </Form>
        )
    }
}