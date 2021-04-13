import React from 'react'
import {Link} from 'react-router-dom'

class LandingPage extends React.Component {
    render() {
        return(
            <div className="landing_main">
                <div className="landing_intro">
                    <h1>Welcome to Movie Roulette</h1>
                    <h2>A roulette game for movie nights where you just can't figure out what to watch</h2>
                </div>
                <div>
                    <Link to='/login'>Log in</Link>
                </div>
                
            </div>
        )
    }
}

export default LandingPage;