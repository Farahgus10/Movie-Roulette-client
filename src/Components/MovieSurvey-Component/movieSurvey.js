import React from 'react'
import MovieService from '../../Services/Movie-Service'
import ProfileService from '../../Services/Profile-Service'
import TokenService from '../../Services/Token-service'

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
                this.setState({
                    profileId: profile[0].user_id
                })
            })
    }

    renderQuestion() {
       return this.state.questions.map(question => 
            <div>
                <p>{question}</p>
            </div>
        )
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
        return this.state.allGenres.map((val, i) => 
            <div>
                <input onChange={e => this.selectCheckbox(e)} type="checkbox" id={val.id} value={val.id} name={val.name}/>
                <label for={val.name}>{val.name}</label>
            </div>
        )
    }

    renderAnswers = () => {
        if(this.state.questionIndex === 0) {
            return this.renderGenreQuestion();
        }
    }

    nextQuestion = () => {
        if(this.state.questionIndex <= this.state.questions.length) {
            this.setState({
                questionIndex: this.state.questionIndex + 1
            })
        } else {
            console.log('end of quiz function here')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userID = this.state.profileId;
        const genres = this.state.selectedGenres.join(',')
        ProfileService.updateUserProfile(userID, {
            genre_like: genres
        })
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
            })
    }
    
    render() {
        console.log(this.state.selectedGenres)
        return(
            <div>
                <form className="survey_form" onSubmit={this.handleSubmit}>
                    {this.renderQuestion()[this.state.questionIndex]}<br></br>
                    {this.renderAnswers()}
                    <button onClick={this.nextQuestion}>Next</button>
                    <button type='submit' >Submit</button>
                </form>
                
            </div>            
        )
    }
}
