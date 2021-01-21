import React from 'react';
import MovieService from '../../Services/Movie-Service'
import './movieRoulette.css'

class MovieRoulette extends React.Component {
    state = {
        currentMovieIndex: 0,
        filteredMovieList: [],
    }

    componentDidMount() {
       Promise.all([
           MovieService.getMyMovies(),
           MovieService.getAllMovies()
       ]).then(([arr1, arr2]) => {
           let myMovieIds = [];
           arr1.map(movie => {
               myMovieIds.push(movie.id);
           })
           let filteredMovies = arr2.results.filter(val => !myMovieIds.includes(val.id))

           this.setState({
                filteredMovieList: filteredMovies,
           });
       })
    }

    addToYourMovies = () => {
        // id, title, overview, genre_id, release_date
        const currentMovie = this.state.filteredMovieList[this.state.currentMovieIndex];
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
            this.state.filteredMovieList.splice(this.state.currentMovieIndex, 1);
        }

        this.setState({
            currentMovieIndex: this.state.currentMovieIndex
        })
        // this.filterMovies();
    }

    thumbsUp = () => {
        this.addToYourMovies();

        //calling this.thumbsDown() b/c thumbsUp() requires the same action performed in thumbsDown() after adding to your movies
        this.thumbsDown();
    }

    // filterMovies() {
    //     const movieIDs = this.state.movieIds;
    //     this.props.filteredMovies.filter(val => !movieIDs.includes(val.id)
    //     );
    // }

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