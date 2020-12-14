import React from 'react-router-dom';

function moviePreference() {
    return(
        <div className="movie-questions">
            <h3>What kind of movies do you enjoy?</h3>

            <form>
                <fieldset>
                    <label><input type="checkbox" value="Action"/>Action</label>
                    <label><input type="checkbox" value="Adventure"/>Adventure</label>
                    <label><input type="checkbox" value="Comedy"/>Comedy</label>
                    <label><input type="checkbox" value="Documentary"/>Documentary</label>
                </fieldset>
            </form>
            
            
            <button type="submit">Continue</button>
        </div>
    )
}

export default moviePreference;