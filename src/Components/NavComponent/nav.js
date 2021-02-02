import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../Services/Token-service'


export default class Nav extends React.Component {
    
    handleLogoutClick() {
        TokenService.clearAuthToken();
    }

    renderLogoutLink() {
        return (
            <nav>
                <div className="nav_link_logged_in">
                <Link onClick={this.handleLogoutClick} to='/login'>Logout</Link>
                </div>
            </nav>
        ) 
    }

    render() {
        return(
            <div>
                {TokenService.getAuthToken() 
                    ? this.renderLogoutLink()
                    : " "
                }
            </div>
        )
    }
}