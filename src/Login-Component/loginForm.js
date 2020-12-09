import React from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';
import './loginComponent.css';

function loginForm(props) {
    return (
        <div className="login_page">
            <Logo/>
            <div className="login_form">
                <h1>Login</h1>
                <form id="login-form">
                <input type="text" name="username" id="username-field" placeholder="username"/>
                <input type="password" name="password" id="password-field" placeholder="password"/>
                <button type="submit" value="login" id="login-submit">Login</button>
            </form>

        <Link to="/signup">Don't have an account? Sign up!</Link>
            </div>
            
        </div>
    ) 
}

export default loginForm;