import dbConnect from './dbConnect';

import axios from 'axios';

const CreatePostService = {};

CreatePostService.creatPost = (user_posted_id, tag_id, content_url, title, summary, caption) => {
    return axios.post(`${dbConnect}/post/`, {
        user_posted_id, 
        tag_id,
        content_url, 
        title,
        summary,
        caption
    })
};

export default CreatePostService;