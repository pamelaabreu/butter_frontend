import React from 'react';
import { Link } from 'react-router-dom';
import './newsfeed.css';

export default (props) => {
    return props.allPosts.map((e, i) => {
        const {caption, content_url, id, summary, title} = e;
        return (
            <div key={i} className="newsfeedPost">
              <p className="feedTitle">{title}</p>
              <Link to={"/video/"+ id}>
                <img className='feedImg' src={content_url} />
              </Link>
                      
              <div className='newsfeedInfo'>
                {/* <Link className='newsfeedUsername' to={"/user/" + followingUser.username}>@{followingUser.username}</Link> */}
                {/* <p className="newsfeedLikes">1000 YAS!</p> */}
              </div>
          
              <p className="feedCaption">{caption}</p>
            </div>
      );
    })
}
