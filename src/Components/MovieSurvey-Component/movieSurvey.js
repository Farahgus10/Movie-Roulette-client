import React from 'react'
import MovieService from '../../Services/Movie-Service'

export default class MovieSurvey extends React.Component {
    state = {
        allGenres: [],
        questionNum: 1,
        questionIndex: 0,
        questions: [
            'What genre?',
            'What actors?',
            'Question 3',
            'Question 4'
        ]
    }

    componentDidMount() {
        MovieService.getMovieGenres()
            .then(results => {
                this.setState({
                    allGenres: results.genres
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

    renderGenreQuestion() { 
        return this.state.allGenres.map((val, i) => 
            <div>
                <input type="checkbox" id={val.id} name={val.name}/>
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
    
    render() {
        console.log(this.state.questionIndex)
        return(
            <div>{this.renderQuestion()[this.state.questionIndex]}<br></br>
                {this.renderAnswers()}
                <button onClick={this.nextQuestion}>Next</button>
            </div>            
        )
    }
}
