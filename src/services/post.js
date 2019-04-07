import axios from 'axios';
const PostService = {};

PostService.getPostInformation = (postId) => {
    const readPost = axios.get(`http://localhost:3000/post/${parseInt(postId)}/`)
    .then(res => res.data)

    const readLikes = axios.get(`http://localhost:3000/like/${parseInt(postId)}/readAllLikes`)
    .then(res => res.data)

    const readComments = axios.get(`http://localhost:3000/comment/${parseInt(postId)}/readAllComments`)
    .then(res => res.data)
    
    const readUserInfo = readPost.then(({user_posted_id}) => axios.get(`http://localhost:3000/user/${parseInt(user_posted_id)}/`)).then(res => res.data)

    const readTags = readPost.then(({tag_id}) => tag_id ? axios.get(`http://localhost:3000/tag/${tag_id}`).then(res => res.data) : null)

    const data = Promise.all([readPost, readLikes, readComments, readUserInfo, readTags]).then(allData => {
        const postInfo = allData[0];
        const likesInfo = allData[1];
        const commentsInfo = allData[2];
        const userInfo = allData[3];
        const tagInfo = allData[4];
       
        return { postInfo, likesInfo, commentsInfo, userInfo, tagInfo };
      })

      return data;
};

export default PostService;