import React from 'react'
import GameDetail from './GameDetail'

// const GameShow = ({ match, games }) => {
//     const matchingGame = games.find(game => {
//         return game.id.toString() === match.params.gameId})
    
//     return (
//         <div>
//             <GameDetail
//                 likes={matchingGame.likes}
//                 dislikes={matchingGame.dislikes}
//                 key={matchingGame.id}
//                 game={matchingGame}
//             />
//         </div>
//     )
// }

// export default GameShow


export default class GameShow extends React.Component {
        
    
    render() {
        const matchingGame = this.props.games.find(game => {
            return game.id.toString() === this.props.match.params.gameId})

            return (
            <div>
                <GameDetail
                key={matchingGame.id}
                game={matchingGame}
                />
            </div>
        )
    }
}
