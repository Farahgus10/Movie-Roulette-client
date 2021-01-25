import React from 'react';
import MovieService from '../../Services/Movie-Service'
import './movieRoulette.css'

class MovieRoulette extends React.Component {
    state = {
        currentMovieIndex: 0,
        currentMovieDisliked: true,
        filteredMovieList: [],
    }

    componentDidMount() {
       Promise.all([
           MovieService.getMyMovies(),
           MovieService.getAllMovies()
       ]).then(([arr1, arr2]) => {
           let myMovieIds = [];
           arr1.map(movie => {
               console.log(movie)
               myMovieIds.push(movie.id);
           })
           let filteredMovies = arr2.results.filter(val => !myMovieIds.includes(val.id))
           console.log(filteredMovies)

           this.setState({
                filteredMovieList: filteredMovies,
           });
       })
    }

    addToYourMovies = (disliked) => {
        // id, title, overview, genre_id, release_date
        const currentMovie = this.state.filteredMovieList[this.state.currentMovieIndex];
        const movieID = currentMovie.id;
        const movieTitle = currentMovie.original_title;
        const movieOverview = currentMovie.overview;
        const genreID = [...currentMovie.genre_ids].join(', ');
        const releaseDate = currentMovie.release_date;

        console.log(disliked)

        MovieService.postMovie({
            id: movieID,
            title: movieTitle,
            overview: movieOverview,
            genre_id: genreID,
            release_date: releaseDate,
            disliked: disliked
        })
    }

    thumbsDown = () => {
        this.setState({
            currentMovieDisliked: true
        }, () => {
            this.addToYourMovies(this.state.currentMovieDisliked)
            if(this.state.currentMovieIndex > -1) {
            this.state.filteredMovieList.splice(this.state.currentMovieIndex, 1);
        }
            this.setState({
                currentMovieIndex: this.state.currentMovieIndex
            })
        })
    }

    thumbsUp = () => {
        this.setState({
            currentMovieDisliked: false
        }, () => {
            this.addToYourMovies(this.state.currentMovieDisliked)
            if(this.state.currentMovieIndex > -1) {
                this.state.filteredMovieList.splice(this.state.currentMovieIndex, 1);
            }
            this.setState({
                currentMovieIndex: this.state.currentMovieIndex
            })
            })
    }

    render() {
        let currentMovieTitle = (!this.state.filteredMovieList[this.state.currentMovieIndex]) ? [] : this.state.filteredMovieList[this.state.currentMovieIndex].original_title;
        let currentMovieOverview = (!this.state.filteredMovieList[this.state.currentMovieIndex]) ? [] : this.state.filteredMovieList[this.state.currentMovieIndex].overview;
        let currentMoviePoster = (!this.state.filteredMovieList[this.state.currentMovieIndex]) ? [] : this.state.filteredMovieList[this.state.currentMovieIndex].poster_path;

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