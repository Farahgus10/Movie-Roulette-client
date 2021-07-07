import React from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../Services/Token-service'

export default function Logout(props) {
    function renderLogout() {
        return (
            <div className="logout_link">
                <Link to='/login'
                onClick={handleLogout}
                >Logout</Link>
            </div>
        )   
    }

    function handleLogout() {
        TokenService.clearAuthToken()
    }
    
    return (
        <div className='logout'>
            {renderLogout()}
        </div>
    )
}