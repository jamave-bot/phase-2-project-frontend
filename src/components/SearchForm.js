import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

export default class SearchForm extends Component {

    state={
        horror: false,
        adventure: false,
        "co-op": false,
        pvp:false,
        mmo: false,
        action: false,
    }

    handleChange = (evt) =>{
        this.props.changeSearchTerm(evt.target.value)
    }

    handleClick = (evt) =>{
        console.log("VALUE: ", evt.target.value)
        this.setState((prevState) => ({ [evt.target.value]: !prevState[evt.target.value] }))
        this.props.changeGenreFilter(evt.target.value)
    }

    render() {
        return (
            <div>
                <Input placeholder='Enter game name...' onChange={this.handleChange}/>
                <br></br>
                <Button toggle active={this.state.horror} value='horror' onClick={this.handleClick}>Horror</Button>
                <Button toggle active={this.state.adventure} value='adventure'onClick={this.handleClick}>Adventure</Button>
                <Button toggle active={this.state["co-op"]} value='co-op' onClick={this.handleClick}>Co-op</Button>
                <Button toggle active={this.state.pvp} value='pvp' onClick={this.handleClick}>PvP</Button>
                <Button toggle active={this.state.mmo} value='mmo'onClick={this.handleClick}>MMO</Button>
                <Button toggle active={this.state.action} value='action'onClick={this.handleClick}>Action</Button>


            </div>
        )
    }
}