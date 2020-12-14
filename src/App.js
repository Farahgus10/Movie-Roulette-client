import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import SignUpPage from './Signup-Component/signupForm';
import LoginForm from './Login-Component/loginForm'
import MoviePreference from './MovieQuiz-Component/moviePreference'
import MovieRoulette from './MovieRoulette-Component/movieRoulette'
import YourMovies from './ProfileComponent/yourMovies'
import MovieProfile from './ProfileComponent/movieProfile'
import Footer from './FooterComponent/footer';
import './App.css'

class App extends React.Component {
  state = {
      movieRoulette: ['movie 1', 'movie 2', 'movie 3', 'movie 4', 'movie 5'],
  }


  render() {
    return (
      <main className='App'>
        {/* <LoginForm/> */}
          <Route exact path='/' component={LoginForm} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/genre-select' component={MoviePreference} />

          <Route exact path="/movie-roulette" render={() => (
            <MovieRoulette movies={this.state.movieRoulette}/> 
          )} />


          <Route path='/your-movies' component={YourMovies} />
          <Route path='/movie-profile' component={MovieProfile} />
        
        <Footer />
      </main>
    );
  }
}

export default App;
