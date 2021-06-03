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
                        <SearchForm changeSearchTerm={this.changeSearchTerm} changeGenreFilter={this.changeGenreFilter}/>
                        <GamesList games={this.state.genreFilter.length? filteredByGenreArr : filteredByNameArr} />
                    </Route>
                </Switch>
            </div>
    
        )
    }
}
