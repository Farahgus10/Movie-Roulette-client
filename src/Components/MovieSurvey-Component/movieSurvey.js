import React from 'react'
import MovieService from '../../Services/Movie-Service'
import ProfileService from '../../Services/Profile-Service'
import './movieSurvey.css'

export default class MovieSurvey extends React.Component {
    state = {
        profileId: '',
        allGenres: [],
        questionNum: 1,
        questionIndex: 0,
        questions: [
            'What genres?'
        ],
        selectedGenres: [],
    }

    componentDidMount() {
        MovieService.getMovieGenres()
            .then(results => {
                this.setState({
                    allGenres: results.genres
                })
            })  
            
        ProfileService.getCurrentUserProfile()
            .then(profile => {
                if(profile[0].genre_like !== 'none') {
                    this.setState({
                        selectedGenres: JSON.parse(profile[0].genre_like)
                    })
                }
                this.setState({
                    profileId: profile[0].user_id,
                })
            })
    }

    selectCheckbox = (e) => {
        const genres = this.state.selectedGenres
        let index
        if(e.target.checked) {
            genres.push({"name": e.target.name, "value":+e.target.value})
        } else {
            index = genres.findIndex(i => i.value === +e.target.value)
            genres.splice(index, 1)
        }

        this.setState({
            selectedGenres: genres
        })
    }

    renderGenreQuestion() { 
        const val = this.state.selectedGenres.map(genre => genre).sort(function(a,b) {return a-b})
        const genres = this.state.allGenres.map(genre => genre).sort(function(a,b) {return a-b})

        let matchFound;
        let matches = [];
        for(let i=0; i< val.length; i++) {
            matchFound = false;
            for(let y=0; y < genres.length; y++) {
                if(val[i].value == genres[y].id) {
                    matchFound = true;
                    break;
                } 
            }

            if(matchFound) {
                matches.push(val[i].value);
            }
        }

        return this.state.allGenres.map((val, id) =>      
            <label key={id}>
                {val.name}
            <input
                    onClick={this.selectCheckbox}
                    type="checkbox"
                    value={val.id}
                    name={val.name}
                    checked={matches.includes(val.id)}
                /><br></br>
                
            </label> 
        )
    }

    renderAnswers = () => {
        if(this.state.questionIndex === 0) {
            return this.renderGenreQuestion();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userID = this.state.profileId;
        const genres = JSON.stringify(this.state.selectedGenres)
        ProfileService.updateUserProfile(userID, {
            genre_like: genres
        })
            .then(
                this.props.submitSuccess()
            )
    }
    
    render() {
        return(
            <div className='survey'>
                <h1>Select the Genres your prefer:</h1>
                <form className="survey_form" onSubmit={this.handleSubmit}>
                    
                    {this.renderAnswers()}
                    <button type='submit'>Submit</button>
                </form>
            </div>            
        )
    }
}
