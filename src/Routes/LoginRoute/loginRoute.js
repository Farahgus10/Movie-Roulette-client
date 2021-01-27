import React from 'react'
import LoginForm from '../../Components/Login-Component/loginForm'

export default class LoginRoute extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSucces = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/movie-roulette'
        history.push(destination)
    }

    render() {
        return (
            <section>
                <div>
                    <LoginForm loginSuccess={this.handleLoginSucces}/>
                </div>
            </section>
        )
    }
}