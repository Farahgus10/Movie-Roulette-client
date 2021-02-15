import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Nav from './Components/NavComponent/nav'
import RegistrationRoute from './Routes/RegistrationRoute/registration'
import LoginRoute from './Routes/LoginRoute/loginRoute'
import MoviePreference from './Components/MovieQuiz-Component/moviePreference'
import MovieRoulette from './Components/MovieRoulette-Component/movieRoulette'
import YourMovies from './Components/ProfileComponent/yourMovies'
import MovieProfile from './Components/ProfileComponent/movieProfile'
import MovieSurvey from './Components/MovieSurvey-Component/movieSurvey'
import Footer from './Components/FooterComponent/footer'
import MovieService from './Services/Movie-Service'
import PrivateRoute from './Routes/PrivateRoute/Private-route'
import './App.css'

class App extends React.Component {
  // state = {
  //     yourMovieList: [],
  // }

  // componentDidMount() {
  //   MovieService.getMyMovies()
  //       .then(movie => {
  //           this.setState({
  //             yourMovieList: movie
  //           })
  //         })
  // }

  render() {
    let loginComponent;
    if(this.props != {}) {
      loginComponent = <Route exact path='/' component={LoginRoute} />
    }
    
    return (
      <main className='App'>
        <Nav />
        {/* <LoginForm/> */}
        <Switch>
          
          <Route exact path='/login' component={LoginRoute} />
          <Route path='/signup' component={RegistrationRoute} />
          <Route path='/genre-select' component={MoviePreference} />


          <PrivateRoute path={'/movie-roulette'} component={MovieRoulette}/>
          <PrivateRoute path={'/your-movies'} component={YourMovies} />
          <PrivateRoute path={'/movie-profile'} component={MovieProfile} />
          <PrivateRoute path={'/movie-survey'} component={MovieSurvey} />
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default withRouter(App);
