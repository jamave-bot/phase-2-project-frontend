import React from 'react'
import GameDetail from './GameDetail'

const GameShow = ({ match, games }) => {
    const matchingGame = games.find(game => {
        return game.id.toString() === match.params.gameId})
    
    return (
        <div>
            <GameDetail
                key={matchingGame.id}
                game={matchingGame}
            />
        </div>
    )
}

export default GameShow