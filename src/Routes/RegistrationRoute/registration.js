import React from 'react'
import RegistrationForm from '../../Components/Signup-Component/signupForm'

export default class RegistrationRoute extends React.Component {
    static defaultProps = {
        history: {
            push: () => {},
        }
    }

    handleRegistrationSuccess = () => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return(
            <section>
                <div className="registration_header">Sign Up</div>
                <div>
                    <RegistrationForm  registrationSuccess={this.handleRegistrationSuccess}/>
                </div>
            </section>
        )
    }
}