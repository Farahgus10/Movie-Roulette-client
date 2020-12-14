import React from 'react';
import './movieRoulette.css'

function MovieRoulette(props) {
    console.log(props.movies)

    return(
        <div>
            <h1>Movie Roulette</h1>
            <div className="roulette">
                <div className="roulette-pic">
                    picture here
                    <div className="roulette-desc">
                        <p><em><b>Movie title here</b></em></p>
                        <p>Movie description here</p>
                    </div>
                </div>
                
                <div className="thumbs">
                     <div className="thumbs-up">
                        <button type="submit">thumbs up</button>
                    </div>
                    <div className="thumbs-down">
                        <button type="submit">thumbs down</button>
                    </div>
                </div>
               

            </div>
        </div>
    )
}

export default MovieRoulette;