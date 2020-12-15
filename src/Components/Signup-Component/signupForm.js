import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Login-Component/logo';
// import '../Components/FooterComponent/Login-Component/loginComponent.css'

function signupForm() {
    return(
        <div className="signup_page">
            <Logo/>
            <div className="signup_form">
                <h1>Sign up</h1>
                <form id="signup-form">
                <input type="text" name="email" id="email-field" placeholder="email"/>
                <input type="text" name="username" id="username-field" placeholder="username"/>
                <input type="text" name="password" id="password-field" placeholder="password"/>
                <button type="submit" value="signup" id="signup-submit">Sign up!</button>
            </form>

        <Link to="/">Already have an account? Click here to login.</Link> 
            </div>
            
        </div>
    )
}

export default signupForm;