// import logo from './logo.svg';
import './App.css';
import GamesCollection from './components/GamesCollection'

// MVP:
// User will be able to:
// Browse store and can thumbs up or down game
// Leave a review for the game and can delete review
// Filter games on genre or rating and sale
// Add likes/dislikes ratio (stretch: display the bar like they do on youtube)



import React, { Component } from 'react'

export default class App extends Component {
  state ={
    games: [],
  }


  componentDidMount= async ()=>{
    try { 
      let promise = await fetch('http://localhost:4000/games')
      let json = await promise.json()
      this.setState({
        games: json
      })
    } catch(error){
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <GamesCollection games={this.state.games} />
      </div>
    )
  }
}

