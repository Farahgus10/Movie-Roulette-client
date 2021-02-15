import React from 'react';
import Logo from './logo';
import TokenService from '../../Services/Token-service'
import AuthApiService from '../../Services/Auth-api-service'
import { Link } from 'react-router-dom';
import './loginComponent.css';

class loginForm extends React.Component {
    state = {
        error: null
    }

    handleSubmit = e => {
        e.preventDefault();
        const { full_name, password } = e.target;
        this.setState({ errore: null })

        AuthApiService.postLogin({
            full_name: full_name.value,
            password: password.value,
        })
        .then(res => {
            full_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.loginSuccess();
        }) 
        .catch(res => {
            this.setState({ error: res.error })
        })
    }


    render() {
        return (
            <div className="login_page">
                <Logo/>
                <div className="login_form">
                    <h1>Login</h1>
                    <form className="loginForm" onSubmit={this.handleSubmit}>
                    <input type="text" name="full_name" id="full_name" placeholder="full_name"/>
                    <input type="password" name="password" id="password" placeholder="password"/>
                    <button type='submit' className="sign-up-button btn">Login</button>
                    {/* <Link to="/movie-roulette">Login</Link> */}
                </form>

            <Link to="/signup">Don't have an account? Sign up!</Link>
                </div>
                
            </div>
        )
    } 
}

export default loginForm;