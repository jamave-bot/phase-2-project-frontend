import React, { Component } from 'react'
import GamesDisplay from './GamesDisplay'

//props: games: an array of gameObj

export default class GamesCollection extends Component {

    showGames = ()=> {
        return this.props.games.map(game =>{
            return <GamesDisplay game={game} key={game.id}/>
        })
    }

    render() {
        return (
            <div>
                {this.showGames()}
            </div>
        )
    }
}
