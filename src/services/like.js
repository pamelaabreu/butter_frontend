import dbConnect from './dbConnect';

import axios from 'axios';

const LikeService = {};

LikeService.getAllLikes = postId => {
    return axios.get(`${dbConnect}/like/${postId}/readAllLikes/`).then(res => res.data)
};

LikeService.checkUserLike = (postLikeId, userLikeId) => {
    return axios.get(`${dbConnect}/like/checkLike/${postLikeId}/${userLikeId}`).then(res => res.data)
};

LikeService.createLike = (user_like_id, post_like_id) => {
    return axios.post(`${dbConnect}/like/`, {user_like_id, post_like_id}).then(res => res.data)
};

LikeService.deleteLike = likeId => axios.delete(`${dbConnect}/like/${likeId}`).then(res => res.data)


export default LikeService;