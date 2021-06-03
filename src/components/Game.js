import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

class Game extends React.Component {
    render() {
        return (

                <div>
                <Grid>
                    <Grid.Column width={2}>
                    
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Image src={this.props.game.image} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <h2>{this.props.game.name}</h2>
                        <Switch>
                            <Route path={`/games/${this.props.game.id}`} >
                                <Link to='/games' className='links'>Back</Link>
                            </Route>
                            <Route path='/games'>
                                <Link to={`/games/${this.props.game.id}`} className='links'>More info</Link>
                            </Route>
                        </Switch>
                    </Grid.Column>
                </Grid>
                {/* <h2>{this.props.game.name}</h2>
                <img src={this.props.game.image} />
                <br></br> */}

            </div>
        )
    }
}
export default Game