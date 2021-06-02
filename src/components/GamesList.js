import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class GamesList extends Component {
    state={
        showDetails: false,
        likes: this.props.game.likes,
        dislikes: this.props.game.dislikes,
        showForm: false,
        reviews: this.props.game.reviews
    }

    showGame = ()=>{
        return <>
            <h2>{this.props.game.name}</h2>
            <Image src={this.props.game.image} size='small'/>
            <p>price: {this.props.game.price !== 0 ? this.props.game.price: 'Free'}</p>
            <Link to={`/games/${this.props.game.id}`}>Expand Game</Link>
        </>
    }


    render() {
        return (
            <div>
                {this.showGame()}
            </div>
        )
    }
}
