import React from 'react'
import Game from './Game'

class GamesList extends React.Component {
    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

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