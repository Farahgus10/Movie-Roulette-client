import React from 'react';
import MovieService from '../../Services/Movie-Service'
import './movieRoulette.css'

class MovieRoulette extends React.Component {
    state = {
        currentMovieIndex: 0,
        movieRoulette: [],
        yourMovieList: [],
    }

    componentDidMount() {
        MovieService.getMyMovies()
            .then(movie => {
                this.setState({
                  yourMovieList: movie
                })
              })
    
        MovieService.getAllMovies()
            .then(movie => {
                let filteredMovies = movie.results.filter(val => {
                    return this.props.movieIds.indexOf(val.id) === -1;
                })
                this.setState({
                    movieRoulette: filteredMovies
                })
            })
      }

    addToYourMovies = () => {
        // id, title, overview, genre_id, release_date
        const currentMovie = this.state.movieRoulette[this.state.currentMovieIndex];
        const movieID = currentMovie.id;
        const movieTitle = currentMovie.original_title;
        const movieOverview = currentMovie.overview;
        const genreID = [...currentMovie.genre_ids].join(', ');
        const releaseDate = currentMovie.release_date;

        MovieService.postMovie({
            id: movieID,
            title: movieTitle,
            overview: movieOverview,
            genre_id: genreID,
            release_date: releaseDate,
        })
    }

    thumbsDown = () => {
        if(this.state.currentMovieIndex > -1) {
            this.state.movieRoulette.splice(this.state.currentMovieIndex, 1);
        }

        let newArr = [...this.state.movieRoulette]

        this.setState({
            currentMovieIndex: this.state.currentMovieIndex,
            movieRoulette: newArr
        })
    }

    thumbsUp = () => {
        this.addToYourMovies();
        this.thumbsDown();
        //find index of the last image in array
        // const lastIndex = this.state.currentMovieIndex.length - 1;

        // const { currentMovieIndex } = this.state;

        // //check if we need to start over from the last index
        // const resetIndex = currentMovieIndex === lastIndex;
        // const index = resetIndex ? 0 : currentMovieIndex + 1;

        // this.setState({
        //     currentMovieIndex: index
        // })
    }

    render() {
        console.log(this.state.movieRoulette)
        let currentMovieTitle = (!this.state.movieRoulette[this.state.currentMovieIndex]) ? [] : this.state.movieRoulette[this.state.currentMovieIndex].original_title;
        let currentMovieOverview = (!this.state.movieRoulette[this.state.currentMovieIndex]) ? [] : this.state.movieRoulette[this.state.currentMovieIndex].overview;
        let currentMoviePoster = (!this.state.movieRoulette[this.state.currentMovieIndex]) ? [] : this.state.movieRoulette[this.state.currentMovieIndex].poster_path;

        return (
            <div>
                <h1>Movie Roulette</h1>
                <div className="roulette">
                    <div className="roulette-pic">
                        <img src={currentMoviePoster} alt="image" />
                    </div>
                    <div className="roulette-desc">
                        <p><em><b>{currentMovieTitle}</b></em></p>
                        <p>{currentMovieOverview}</p>
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