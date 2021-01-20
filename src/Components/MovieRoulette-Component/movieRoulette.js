import React from 'react';
import MovieService from '../../Services/Movie-Service'
import './movieRoulette.css'

class MovieRoulette extends React.Component {
    state = {
        currentMovieIndex: 0,
        movieRoulette: [],
        filteredMovieList: [],
        yourMovieList: [],
        movieIds: []
    }

    componentDidMount() {
        MovieService.getMyMovies()
            .then(movie => {
                let idArr = [];
                movie.map(val => {
                    idArr.push(val.id)
                    console.log(idArr)
                })
                console.log(idArr)
                this.setState({
                  yourMovieList: movie,
                  movieIds: idArr
                })
              })

        // MovieService.getAllMovies()
        //     .then(movie => {
        //         console.log(this.state.movieIds)
        //         let filteredMovies = movie.results.filter(val => {
        //             return this.props.movieIds.indexOf(val.id) === -1;
        //         })
        //         this.setState({
        //             movieRoulette: filteredMovies
        //         })
        //     })
      }

    addToYourMovies = () => {
        // id, title, overview, genre_id, release_date
        const currentMovie = this.props.movieRoulette[this.state.currentMovieIndex];
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
            this.props.movieRoulette.splice(this.state.currentMovieIndex, 1);
        }

        let newArr = [...this.props.movieRoulette]

        this.setState({
            currentMovieIndex: this.state.currentMovieIndex,
            movieRoulette: newArr
        })

        this.filterMovies();
    }

    thumbsUp = () => {
        this.addToYourMovies();

        //calling this.thumbsDown() b/c thumbsUp() requires the same action performed in thumbsDown() after adding to your movies
        this.thumbsDown();
    }

    filterMovies() {
        const movieIDs = this.state.movieIds;
        this.props.movieRoulette.filter(val => !movieIDs.includes(val.id)
        );

        // this.setState({
        //     filteredMovieList: allMovies,
        // })
    }

    render() {
        console.log(this.state.movieIds)
        console.log(this.props.movieRoulette)

        let currentMovieTitle = (!this.props.movieRoulette[this.state.currentMovieIndex]) ? [] : this.props.movieRoulette[this.state.currentMovieIndex].original_title;
        let currentMovieOverview = (!this.props.movieRoulette[this.state.currentMovieIndex]) ? [] : this.props.movieRoulette[this.state.currentMovieIndex].overview;
        let currentMoviePoster = (!this.props.movieRoulette[this.state.currentMovieIndex]) ? [] : this.props.movieRoulette[this.state.currentMovieIndex].poster_path;

        console.log(currentMovieTitle)

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