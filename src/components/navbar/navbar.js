import React from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import './navbar.css';

export default class Navbar extends React.Component {
    static contextType = AuthContext;

    render () {

        const navbar = <>
            <div className="navbarBox navbarTop">
                <div className="navbarButton newsfeed">
                    <Link className='navbarText newsfeed' to="/">h</Link>
                </div>
            
                <div className="navbarButton explore">
                    <Link className='navbarText explore' to="/explore">e</Link>
                </div>
            
                <div className="navbarButton search">
                    <Link className='navbarText search' to="/search">s</Link>
                </div>
            </div>

            <div className="navbarBox navbarBottom">
                <div className="navbarButton favorites">
                    <Link className='navbarText favorites' to="/favorites/:id">b</Link>
                </div>
            
                <div className="navbarButton user">
                    <Link className='navbarText user' to={"/user/" + this.context.dbUser.username}>u</Link>
                </div>
            
                <div className="navbarButton plus">
                    <Link className='navbarText plus' to={'/createPost/' + this.context.firebaseUid}>+</Link>
                </div>

                <div className="navbarButton notification">
                    <Link className='navbarText notification' to="/notifications">n</Link>
                </div>
            </div>
        </>
        return (
                <AuthContext.Consumer>
                    {
                        ({user}) =>  user ? navbar : null
                    }
                </AuthContext.Consumer>
        )
    }
}