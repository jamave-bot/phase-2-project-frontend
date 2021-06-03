import './App.css';
import GamesCollection from './components/GamesCollection'
import { Switch, Route, Link } from 'react-router-dom'
import React, { Component } from 'react'

export default class App extends Component {
  state ={
    games: [],
  }

  componentDidMount(){
    fetch('http://localhost:4000/games')
    .then(res => res.json())
    .then(gamesArr => this.setState({
      games: gamesArr
    }))
  }

  render() {
    return (
      <div>
        <Switch>
          <Route 
            path={'/games'}
            render={routerProps => {
              return <div>
              <GamesCollection {...routerProps} games={this.state.games} /> 
              </div>
            }}
          />
          <Route path={'/'}>
            <></>
            <Link to={'/games'} className='links'>Enter</Link>
          </Route>
        </Switch>
      </div>
    )
  }
}

