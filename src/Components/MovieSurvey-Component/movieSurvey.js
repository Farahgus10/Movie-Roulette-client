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


    // Promise.all([
    //     MovieService.getMyMovies(),
    //     MovieService.getAllMovies()
    // ]).then(([arr1, arr2]) => {
    //     let myMovieIds = [];
    //     arr1.map(movie => {
    //      //    console.log(movie)
    //         myMovieIds.push(movie.id);
    //     })
    //     let filteredMovies = arr2.results.filter(val => !myMovieIds.includes(val.id))
    //  //    console.log(filteredMovies)

    //     this.setState({
    //          filteredMovieList: filteredMovies,
    //     });
    // })

    componentDidMount() {
        // Promise.all([
        //     MovieService.getMovieGenres(),
        //     ProfileService.getCurrentUserProfile()
        // ]).then(([genreArr, profileArr]) => {
        //     const profileGenres = JSON.parse(profileArr[0].genre_like)
        //     const genres = [];
        //     genreArr.genres.map(genre => {
        //         genres.push(genre)
        //     })
        //     profileGenres.map(value => genres.map(id => (value.value === id.id) ? Object.assign({}, genres, {'checked': true}) : console.log('nothing')))
        //     console.log(genres)
           
        // })
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
                    // selectedGenres: genres
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
        const val = this.state.selectedGenres.map(genre => genre).sort(function(a,b) {return a-b})
        // console.log(val)

        const genres = this.state.allGenres.map(genre => genre).sort(function(a,b) {return a-b})
        // console.log(genres)


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
                // console.log('found > ' + val[i].value)
                matches.push(val[i].value)
            } else {
                // console.log('not found >' + val[i])
            }
        }

        let hash = Object.create(null);
        matches.forEach(function(a) {
            hash[a] = a;
            // console.log(hash)
        })

        this.state.allGenres.forEach(function(a, i, aa) {
            hash[a] = a.id
            console.log(hash)
            // if(hash[a]) {
            //     aa[i] = 'match';
            // }
        })
        // console.log(this.state.allGenres)

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
        const genres = JSON.stringify(this.state.selectedGenres)
        ProfileService.updateUserProfile(userID, {
            genre_like: genres
        })
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
            })
    }
    
    render() {
        // const val = this.state.selectedGenres.map(genre => genre).sort(function(a,b) {return a-b})
        // console.log(val)

        // const genres = this.state.allGenres.map(genre => genre).sort(function(a,b) {return a-b})
        // console.log(genres)


        // let matchFound;
        // for(let i=0; i< val.length; i++) {
        //     matchFound = false;
        //     for(let y=0; y < genres.length; y++) {
        //         if(val[i].value == genres[y].id) {
        //             matchFound = true;
        //             break;
        //         } 
        //     }

        //     if(matchFound) {
        //         console.log('found > ' + val[i].value)
        //     } else {
        //         console.log('not found >' + val[i])
        //     }
        // }

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
