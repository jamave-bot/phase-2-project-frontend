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
import SearchForm from './components/SearchForm';

export default class App extends Component {
  state ={
    games: [],
    searchTerm: '',
    genreFilter: [],
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


  findCommonElements=(arr1, arr2)=> {
      
    // Create an empty object
    let obj = {};
          
        // Loop through the first array
        for (let i = 0; i < arr1.length; i++) {
              
            // Check if element from first array
            // already exist in object or not
            if(!obj[arr1[i]]) {
              
                // If it doesn't exist assign the
                // properties equals to the 
                // elements in the array
                const element = arr1[i];
                obj[element] = true;
            }
        }
          
        // Loop through the second array
        for (let j = 0; j < arr2.length ; j++) {
          
        // Check elements from second array exist
        // in the created object or not
        if(obj[arr2[j]]) {
            return true;
        }
    }
    return false;
  }
  

  changeSearchTerm = (newTerm)=>{
    this.setState({
      searchTerm: newTerm
    })
  }

  changeGenreFilter = (genre)=>{
    let copiedArr = [...this.state.genreFilter]
    if(copiedArr.indexOf(genre) > -1){
      copiedArr.splice(copiedArr.indexOf(genre), 1)
      this.setState({
        genreFilter: copiedArr
      })
    } else{
      this.setState({
        genreFilter: [...copiedArr, genre]
      })
    }
  }

  render() {
    console.log(this.state)

    const filteredByNameArr = this.state.games.filter(game =>{
      return  game.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    const filteredByGenreArr = filteredByNameArr.filter(game =>{
      return this.findCommonElements(game.genres, this.state.genreFilter) 
    })
    return (
      <div>
        <SearchForm changeSearchTerm={this.changeSearchTerm} changeGenreFilter={this.changeGenreFilter}/>
        <GamesCollection games={this.state.genreFilter.length? filteredByGenreArr : filteredByNameArr} />
      </div>
    )
  }
}

// this.findCommonElements(game.genres, this.state.genreFilter)
