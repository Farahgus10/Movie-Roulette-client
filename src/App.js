import React, {Component} from 'react';
import { Route } from 'react-router-dom';
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
  }

  componentDidMount() {
    MovieService.getMovies()
        .then(movie => {
          this.setState({
            movieRoulette: movie,
          })
        })
  }

  render() {
    let movies = (!this.state.movieRoulette) ? [] : this.state.movieRoulette.results

    return (
      <main className='App'>
        {/* <LoginForm/> */}
          <Route exact path='/' component={LoginForm} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/genre-select' component={MoviePreference} />

          <Route exact path="/movie-roulette" render={() => (
            <MovieRoulette movies={movies}/> 
          )} />


          <Route path='/your-movies' component={YourMovies} />
          <Route path='/movie-profile' component={MovieProfile} />
        
        <Footer />
      </main>
    );
  }
}

export default App;
