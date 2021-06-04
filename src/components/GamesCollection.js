import React from 'react'
import {Route, Switch} from 'react-router-dom'
import GameShow from './GameShow'
import GamesList from './GamesList'
import SearchForm from './SearchForm'




export default class GamesCollection extends React.Component {
  state ={
    searchTerm: '',
    genreFilter: [],
  }

  findCommonElements=(gameGenres, filterGenres)=>{
    let check = 0;
    filterGenres.forEach(filterGenre => {
      if(!gameGenres.includes(filterGenre)){
        check++
      }
    });
    return check>0? false: true
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
      const filteredByNameArr = this.props.games.filter(game =>{
          return  game.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        })
        const filteredByGenreArr = filteredByNameArr.filter(game =>{
          return this.findCommonElements(game.genres, this.state.genreFilter) 
        })
      return (
          <div>
              <Switch>
                  <Route 
                      path={`${this.props.match.url}/:gameId`}
                      render={routerProps => <GameShow {...routerProps} games={this.props.games}/>}
                  />
                  <Route path={'/games'} >
                      <SearchForm changeSearchTerm={this.changeSearchTerm} changeGenreFilter={this.changeGenreFilter} genreFilter={this.state.genreFilter}/>
                      <GamesList games={this.state.genreFilter.length? filteredByGenreArr : filteredByNameArr} />
                  </Route>
              </Switch>
          </div>
  
      )
  }
}
