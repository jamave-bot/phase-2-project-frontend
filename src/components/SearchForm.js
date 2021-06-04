import React, { Component } from 'react'
import { Input, Button, Grid, Image } from 'semantic-ui-react'
import {Switch, Link, Route} from 'react-router-dom'
import logo from '../watervaporlogo.png'

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
            <div className="searchForm">
                <Grid>
                    <Grid.Column width={2}>
                        <Switch>
                            <Route path='/games'>
                                <Link to="/" className='links'>
                                    <br></br>
                                    <Image src={logo} alt='WV logo' className='smallLogo' />
                                        Home
                                </Link>
                            </Route>
                        </Switch>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <br></br>
                    <br></br>
                    <Input fluid placeholder='Enter game name...' onChange={this.handleChange}/>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid>

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