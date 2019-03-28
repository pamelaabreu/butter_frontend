import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import './searchbar.css';

import SearchResults from '../searchResults/searchResults';

export default class Searchbar extends React.Component {

    state = {
        input: '',
        toggle: false
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value, toggle: false });

    handleSubmit = e => (e.key.toLowerCase() === 'enter') ? this.setState({ toggle: true }) : null;

    searchBar = () => {
        return (
            <>
                <input className="searchBar" name="input"  onChange={this.handleChange} onKeyDown={this.handleSubmit}/>
                {this.state.toggle ?
                    <SearchResults input={this.state.input} />
                    :
                    null
                
                }
            </>
        );
    }

    render () {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                        return this.searchBar();
                        } else {
                        return <Redirect to='/'/>
                        }
                    }
                }
            </AuthContext.Consumer>
      );
    }
};