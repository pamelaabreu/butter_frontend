import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import './navbar.css';

export default (props) => {
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
                <Link className='navbarText user' to="/user/:id">u</Link>
            </div>
        
            <div className="navbarButton plus">
                <Link className='navbarText plus' to="/createPost/:id">+</Link>
            </div>

            <div className="navbarButton notification">
                <Link className='navbarText notification' to="/notifications/:id">n</Link>
            </div>
        </div>
    </>
  return (
        <AuthContext.Consumer>
            {
                (user) => { return navbar }
            }
        </AuthContext.Consumer>
  )
}