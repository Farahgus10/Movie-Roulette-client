import React from 'react'
import MovieSurvey from '../../Components/MovieSurvey-Component/movieSurvey'

export default class MovieSurveyRoute extends React.Component{
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleSubmitSucces = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/movie-profile'
        setTimeout(function(){ history.push(destination) }, 500);
    }

    render() {
        return(
            <div>
                <MovieSurvey submitSuccess={this.handleSubmitSucces} />
            </div>
        )
    }
}