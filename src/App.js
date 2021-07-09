import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Logout from './Components/LogoutComponent/LogoutComponent'
import RegistrationRoute from './Routes/RegistrationRoute/registration'
import LoginRoute from './Routes/PublicRoute/LoginRoute/loginRoute'
import MoviePreference from './Components/MovieQuiz-Component/moviePreference'
import MovieRoulette from './Components/MovieRoulette-Component/movieRoulette'
import YourMovies from './Components/ProfileComponent/yourMovies'
import MovieProfile from './Components/ProfileComponent/movieProfile'
import MovieSurveyRoute from './Routes/MovieSurveyRoute/movieSurveyRoute'
import ProfileService from './Services/Profile-Service'
import Footer from './Components/FooterComponent/footer'
import MovieService from './Services/Movie-Service'
import PrivateRoute from './Routes/PrivateRoute/Private-route'
import LandingPageRoute from './Routes/PublicRoute/LandingPageRoute/landingPageRoute'
import WatchAgain from './Components/ProfileComponent/watchAgain'
import './App.css'

class App extends React.Component {
state = {
 
}

render() {
  let loginComponent;
  if(this.props != {}) {
    loginComponent = <Route exact path='/' component={LoginRoute} />
  }
  
  return (
    <main className='App'>
      <Switch>
        <Route exact path='/' component={LandingPageRoute}/>
        <Route exact path='/login' component={LoginRoute} />
        <Route path='/signup' component={RegistrationRoute} />
        <Route path='/genre-select' component={MoviePreference} />

        <PrivateRoute path={'/movie-roulette'} component={MovieRoulette}/>
        <PrivateRoute path={'/your-movies'} component={YourMovies} />
        <PrivateRoute path={'/movie-profile'} component={MovieProfile} />
        <PrivateRoute path={'/watch-again'} component={WatchAgain}/>
        <PrivateRoute path={'/movie-survey'} component={MovieSurveyRoute} />
      </Switch>
      {/* <Logout /> */}
      <Footer path={this.props.location.pathname}/>
      
    </main>
  );
}
}

export default withRouter(App);
