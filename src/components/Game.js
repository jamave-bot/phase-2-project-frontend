import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'

class Game extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.game.name}</h2>
                <img src={this.props.game.image} />
                <div>
                    <p>Likes: {this.props.game.likes}</p>
                    <p>Dislikes: {this.props.game.dislikes}</p>
                </div>

                <Switch>
                    <Route path={`/games/${this.props.game.id}`} >
                        <Link to='/games'>Back</Link>
                    </Route>
                    <Route path='/games'>
                        <Link to={`/games/${this.props.game.id}`}>More info</Link>
                    </Route>
                </Switch>
            </div>
        )
    }
}
export default Game