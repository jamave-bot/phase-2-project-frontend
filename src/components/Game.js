import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import ReviewForm from './ReviewForm'
import YouTube from 'react-youtube'
import { Image } from 'semantic-ui-react'

export default function Game(props) {
      // Pauses the video when it loads
    // _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    //   }


    const showAll = () =>{
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
      

        return <>
            <p>name: {props.game.name}</p>
            <p>image url: <Image src={props.game.image} size='medium'/></p>
            <p>price: {props.game.price !== 0 ? props.game.price: 'Free'}</p>
            <p>trailer: <YouTube videoId={props.game.trailer} opts={opts}  />  </p>


            {/* LIKES ND DISLIKES ARE SEPARATE/WE'RE GONNA SHOW A RATIO  */}
            <p>likes: {props.game.likes} </p>
            <button name='like' >Like</button>

            <p>dislikes: {props.game.dislikes} </p>
            <button name='dislike'>Dislike</button>

            <p>onSale: {props.game.onSale}</p>
            <p>Year: {props.game.year} </p>
            <p>Reviews: {}</p>
            <button >Add a Review </button>
            {/* {props.game.showForm ? <ReviewForm game={props.game} addReview={addReview}/> : ""} */}


            <p>Genres: {props.game.Genres}</p>
            <button >Show Less</button>
        </>
    }
    return (
        <div>
            <Switch>
                <Route path={`/games/${props.game ===undefined? null: props.game.id}`}>
                    {showAll()}
                    <Link to={'/games'}>Go back</Link>
                </Route>

                {/* <Route path={'/games'}>
                    <Link to={`/games/${props.game ===undefined? null : props.game.id}`}>More Details</Link>
                </Route> */}
            </Switch>
        </div>
    )
}
