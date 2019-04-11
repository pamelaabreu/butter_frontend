import axios from 'axios';

const LikeService = {};

LikeService.getAllLikes = (postId) => {
    return axios.get(`http://localhost:3000/like/${postId}/readAllLikes/`).then(res => res.data)
}

LikeService.checkUserLike = (postLikeId, userLikeId) => {
    return axios.get(`http://localhost:3000/like/checkLike/${postLikeId}/${userLikeId}`).then(res => res.data)
}

LikeService.createLike = (user_like_id, post_like_id) => {
    return axios.post(`http://localhost:3000/like/`, {user_like_id, post_like_id}).then(res => res.data)
}

LikeService.deleteLike = (likeId) => {
    return axios.delete(`http://localhost:3000/like/${likeId}`).then(res => res.data)
}

export default LikeService;