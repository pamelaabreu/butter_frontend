// REACT
import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import './newsfeed.css';

// Components
import LikeButton from '../../containers/likeButton/likeButton';

const Newsfeed = (props) => {
    return props.allPosts.map((e, i) => {
        const {caption, content_url, id, title} = e.postInfo;

        return (
            <div key={i} className="newsfeedPost">
              <p className="feedTitle">{title}</p>
              <Link to={"/viewPost/"+ id}>
                <img className='feedImg' alt={title} src={content_url} />
              </Link>
                      
              <div className='newsfeedInfo'>
                <Link className='newsfeedUsername' to={"/user/" + e.userInfo.username}>@{e.userInfo.username}</Link>
                <LikeButton postInfo={e.postInfo} userInfo={e.userInfo}/>
              </div>
          
              <p className="feedCaption">{caption}</p>
            </div>
      );
    })
}

export default Newsfeed;
