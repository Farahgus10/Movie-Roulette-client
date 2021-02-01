import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Nav from './Components/NavComponent/nav'
import RegistrationRoute from './Routes/RegistrationRoute/registration'
import LoginRoute from './Routes/LoginRoute/loginRoute'
import MoviePreference from './Components/MovieQuiz-Component/moviePreference'
import MovieRoulette from './Components/MovieRoulette-Component/movieRoulette'
import YourMovies from './Components/ProfileComponent/yourMovies'
import MovieProfile from './Components/ProfileComponent/movieProfile'
import Footer from './Components/FooterComponent/footer'
import MovieService from './Services/Movie-Service'
import './App.css'

class App extends React.Component {
  state = {
      yourMovieList: [],
  }

  componentDidMount() {
    MovieService.getMyMovies()
        .then(movie => {
            this.setState({
              yourMovieList: movie
            })
          })
  }

  render() {
    let loginComponent;
    if(this.props != {}) {
      loginComponent = <Route exact path='/' component={LoginRoute} />
    }

    return (
      <main className='App'>
        <Nav />
        {/* <LoginForm/> */}
          
          <Route exact path='/' component={LoginRoute} />
          <Route path='/signup' component={RegistrationRoute} />
          <Route path='/genre-select' component={MoviePreference} />

          <Route exact path="/movie-roulette" render={() => (
            <MovieRoulette /> 
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
