import React from 'react';
import './movieRoulette.css'

class MovieRoulette extends React.Component {
    state = {
        currentMovieIndex: 0,
    }

    addToYourMovies = () => {
        this.props.yourMovies.push(this.props.movies[this.state.currentMovieIndex])
    }

    thumbsUp = () => {
        this.addToYourMovies();
        //find index of the last image in array
        const lastIndex = this.state.currentMovieIndex.length - 1;

        const { currentMovieIndex } = this.state;

        //check if we need to start over from the last index
        const resetIndex = currentMovieIndex === lastIndex;
        const index = resetIndex ? 0 : currentMovieIndex + 1;

        this.setState({
            currentMovieIndex: index
        })
    }
    
    thumbsDown = () => {
        if(this.state.currentMovieIndex > -1) {
            this.props.movies.splice(this.state.currentMovieIndex, 1);
        }
        
        this.setState({
            currentMovieIndex: this.state.currentMovieIndex
        })
    }

    render() {
        const currentMovie = (!this.props.movies) ? [] : this.props.movies.map(item => {
            return item
        });

        return (
            <div>
                <h1>Movie Roulette</h1>
                <div className="roulette">
                    <div className="roulette-pic">
                        {/* <img src={currentMovie[this.state.currentMovieIndex].poster_path} alt="image" /> */}
                    </div>
                    <div className="roulette-desc">
                        {/* <p><em><b>{currentMovie[this.state.currentMovieIndex].title}</b></em></p> */}
                        {/* <p>{currentMovie[this.state.currentMovieIndex].overview}</p> */}
                    </div>
                </div>
                <div className="thumbs">
                      <div className="thumbs-up">
                         <button onClick={this.thumbsUp}>thumbs up</button>
                     </div>
                     <div className="thumbs-down">
                         <button onClick={this.thumbsDown}>thumbs down</button>
                     </div>
                 </div> 
            </div>
        )

    }
}

export default MovieRoulette;