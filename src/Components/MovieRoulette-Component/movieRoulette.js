import React from 'react';
import MovieService from '../../Services/Movie-Service'
import ProfileService from '../../Services/Profile-Service'
import './movieRoulette.css'

class MovieRoulette extends React.Component {
state = {
    currentMovieIndex: 0,
    currentMovieDisliked: true,
    filteredMovieList: [],
    currentProfileInfo: [],
    currentPage: Math.floor(Math.random() * 500),
}

componentDidMount() {
    this.loadMovies();
}

loadMovies = () => {
    Promise.all([
        MovieService.getMyMovies(),
        MovieService.getAllMovies(this.state.currentPage),
        ProfileService.getCurrentUserProfile()
    ]).then(([arr1, arr2, profile]) => {
        if(profile.length == 0) {
            const newUserProfileInfo = {
                'profile_picture': 'profile pic here',
                'genre_like': 'none',
                'actor': 'none'
            }
            ProfileService.insertUserProfile(newUserProfileInfo)
        }
            this.setState({
                currentProfileInfo: profile
            })

        // Variables 
        let myGenres; 
        let myMovieIds = [];
        let filteredMovies;

        // Get the movie id's of movies that the user has already rated 
        arr1.map(movie => {
            myMovieIds.push(movie.id);
        })

        // Get the user's preferred genres, if they have any
        if(profile.map(genre => genre.genre_like)[0] === "none") {
            myGenres = [];
        } else {
            myGenres = profile.map(genre => JSON.parse(genre.genre_like)).map(info => info.map(val => val.value))[0]
        }

        // Filter out movies the user has already rated. If they have preferred genres, filter out non-relevent genres. If not, show all movies
        if(myGenres.length === 0) {
            filteredMovies = arr2.results.filter(val => !myMovieIds.includes(val.id))
        } else {
            filteredMovies = arr2.results.filter(val => !myMovieIds.includes(val.id)).filter(val => val.genre_ids.includes(parseInt(myGenres)))
        }

        // filteredMovies might be empty if a new list is loaded with no genres that the user likes. If this happens, load more
        if(filteredMovies.length === 0) {
            this.loadMovies();
        }
        
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
    const user_id = this.state.currentProfileInfo.map(info => info.user_id).toString();

    MovieService.postMovie({
        id: movieID,
        title: movieTitle,
        overview: movieOverview,
        genre_id: genreID,
        release_date: releaseDate,
        disliked: disliked,
        watched: false,
        user_id: user_id,
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

        // once end of first list is reached, go to next page and load more movies
        if(this.state.filteredMovieList.length < 1) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            })
            this.loadMovies();
        }     
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

        // once end of first list is reached, go to next page and load more movies
        if(this.state.filteredMovieList.length < 1) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            })
            this.loadMovies();
        }      
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
                    <img src={'https://image.tmdb.org/t/p/w300/'+currentMoviePoster} alt="image" />
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