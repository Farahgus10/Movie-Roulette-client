import React from 'react'
import {Link} from 'react-router-dom'
import './landingPageRoute.css'

class LandingPage extends React.Component {
    render() {
        return(
            <div className="landing_main">
                <div className="landing_intro">
                    <h1>Welcome to Movie Roulette</h1>
                    <h2>A roulette game for movie nights when you just can't figure out what to watch</h2>
                </div>
                <div className="get_started">
                    <Link to='/login'>Get Started</Link>
                </div>
                
            </div>
        )
    }
}

export default LandingPage;