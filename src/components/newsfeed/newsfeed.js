import React from 'react';
import { Link } from 'react-router-dom';
import './newsfeed.css';

const Newsfeed = (props) => {
    return props.allPosts.map((e, i) => {
        const {caption, content_url, id, title} = e.postInfo;
        return (
            <div key={i} className="newsfeedPost">
              <p className="feedTitle">{title}</p>
              <Link to={"/video/"+ id}>
                <img className='feedImg' alt={title} src={content_url} />
              </Link>
                      
              <div className='newsfeedInfo'>
                <Link className='newsfeedUsername' to={"/user/" + e.userInfo.username}>@{e.userInfo.username}</Link>
                {/* <p className="newsfeedLikes">1000 YAS!</p> */}
              </div>
          
              <p className="feedCaption">{caption}</p>
            </div>
      );
    })
}

export default Newsfeed;
