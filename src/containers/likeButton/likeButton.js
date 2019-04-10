import React from 'react';

export default class LikeButton extends React.Component {
    render () {
        console.log(this.props)
        return (
            <div>
                <button>Like</button>
                <p>#likes yas!</p>
            </div>
        );
    }
}