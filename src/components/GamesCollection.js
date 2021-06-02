import React, { Component } from 'react'
import GamesDisplay from './GamesDisplay'
import GamesList from './GamesList'
import {Route, Switch} from 'react-router-dom'

//props: games: an array of gameObj

// export default class GamesCollection extends Component {

    // showGames = ()=> {
    //     return this.props.games.map(game =>{
    //         return <GamesList game={game} key={game.id}/>
    //     })
    // }

//     render() {
//         return (
//             <Switch>
//                 <Route path={`${match.url}/:gameId`}
//                 render={routerProps => <GamesDisplay {...routerProps} games={games}/>}></Route>
//                 <Route path='/games'>{this.showGames()}</Route>
//             </Switch>
//         )
//     }
// }

export default function GamesCollection({match, games}) {

    const showGames = ()=> {
        return games.map(game =>{
            return <GamesList game={game} key={game.id}/>
        })
    }

    return (
        <div>
            <Switch>
                <Route path={`${match.url}/:gameId`}
                render={routerProps => games.length === 0? null : <GamesDisplay {...routerProps} game={games}/>}></Route>
                <Route path='/games'>{showGames()}</Route>
            </Switch>
        </div>
    )
}
