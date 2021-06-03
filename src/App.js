import './App.css';
import GamesCollection from './components/GamesCollection'

import { Switch, Route, Link } from 'react-router-dom'

import React, { Component } from 'react'

export default class App extends Component {
  state ={
    games: [],
  }


  // componentDidMount= async ()=>{
  //   try { 
  //     let promise = await fetch('http://localhost:4000/games')
  //     let json = await promise.json()
  //     this.setState({
  //       games: json
  //     })
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

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
            render={routerProps => <GamesCollection {...routerProps} games={this.state.games} />}
          />
          <Route path={'/'}>
            <Link to={'/games'}>Enter</Link>
          </Route>
        </Switch>
      </div>
    )
  }
}

