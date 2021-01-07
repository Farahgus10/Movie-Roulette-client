import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import SignUpPage from './Components/Signup-Component/signupForm';
import LoginForm from './Components/Login-Component/loginForm'
import MoviePreference from './Components/MovieQuiz-Component/moviePreference'
import MovieRoulette from './Components/MovieRoulette-Component/movieRoulette'
import YourMovies from './Components/ProfileComponent/yourMovies'
import MovieProfile from './Components/ProfileComponent/movieProfile'
import Footer from './Components/FooterComponent/footer'
import MovieService from './Services/Movie-Service'
import './App.css'

class App extends React.Component {
  state = {
      movieRoulette: [],
      yourMovieList: [],
  }

  componentDidMount() {
    MovieService.getAllMovies()
        .then(movie => {
          this.setState({
            movieRoulette: movie,
          })
        })
  }

  render() {
    let movies = (!this.state.movieRoulette) ? [] : this.state.movieRoulette.results
    let loginComponent;
    if(this.props != {}) {
      loginComponent = <Route exact path='/' component={LoginForm} />
    }

    return (
      <main className='App'>
        {/* <LoginForm/> */}
          <Route exact path='/' component={LoginForm} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/genre-select' component={MoviePreference} />

          <Route exact path="/movie-roulette" render={() => (
            <MovieRoulette movies={movies} yourMovies={this.state.yourMovieList}/> 
          )} />

          <Route exact path="/your-movies" render={() => (
            <YourMovies yourMovies={this.state.yourMovieList} path={this.props.location}/> 
          )} />

          <Route exact path="/movie-profile" render={() => (
            <MovieProfile path={this.props.location}/> 
          )} />
        
        <Footer />
      </main>
    );
  }
}

export default withRouter(App);
