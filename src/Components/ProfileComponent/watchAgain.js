import React from 'react'
import MovieProfileNav from './movieProfileNav';

class WatchAgain extends React.Component {
    state = {

    }

render() {
    return (
        <div className="watch_again">
            <MovieProfileNav path={this.props.location}/>
        </div>
    )
}
}

export default WatchAgain;