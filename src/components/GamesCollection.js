import React from 'react'
import {Route, Switch} from 'react-router-dom'
import GameShow from './GameShow'
import GamesList from './GamesList'


const GamesCollection = ({match, games}) => (
    
        <div>
            <Switch>
                <Route 
                    path={`${match.url}/:gameId`}
                    render={routerProps => <GameShow {...routerProps} games={games}/>}
                />
                <Route path={'/games'} >
                    <GamesList games={games} />
                </Route>
            </Switch>
        </div>
    
)
export default GamesCollection