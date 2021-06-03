import React from 'react'
import Game from './Game'

class GamesList extends React.Component {
    render() {
        return (
            <div>
                <h1>Games</h1>
                {this.props.games.map(game => (
                    <div>
                        <Game key={game.id} game={game} />
                    </div>
                ))}
            </div>
        )
    }
}
export default GamesList