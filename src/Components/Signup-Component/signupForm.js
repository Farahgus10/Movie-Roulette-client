import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Login-Component/logo';
import AuthApiService from '../../Services/Auth-api-service'
// import '../Components/FooterComponent/Login-Component/loginComponent.css'

class signupForm extends React.Component {
    state = {
      error: null
    }

  handleSubmit = e => {
    e.preventDefault();
    const { full_name, email, password } = e.target

    AuthApiService.postUser({
      full_name: full_name.value,
      email: email.value,
      password: password.value,
    })
      .then(user => {
        full_name.value = ''
        email.value = ''
        password.value = ''
        this.props.registrationSuccess();
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  render() {
    return (
      <div className="signup_page">
        <Logo />
        <div className="signup_form">
          <h1>Sign up</h1>
          <form onSubmit={this.handleSubmit} className="registration-form">
              <input type="text" name="full_name" id="full_name" placeholder="Full Name" />
              <input type="text" name="email" id="email" placeholder="email" />
              <input type="text" name="password" id="password" placeholder="password" />
              {/* <button type="submit" value="signup" id="signup-submit">Sign up!</button> */}
              <button type='submit' className="sign-up-button btn">Sign Up!</button>
              
              <Link to="/">Already have an account? Click here to login.</Link>
          </form>

            
        </div>

      </div>
    )
  }

}

export default signupForm;