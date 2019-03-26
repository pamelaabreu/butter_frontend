import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import './searchbar.css';

export default (props) => {
    const searchBar = <>
        <div className="searchbarBox searchbarTop">
            <div className="navbarButton searchBar" contenteditable="true">
                    <h3></h3>
            </div>
        </div>
    </>

    return (
        <AuthContext.Consumer>
            {
                (user) => {
                    if (user) {
                    return searchBar;
                    } else {
                    return <Redirect to='/'/>
                    }
                }
            }
        </AuthContext.Consumer>
  );
}