import dbConnect from './dbConnect';

import axios from 'axios';

const FollowService = {};

FollowService.checkUserFollowing = (userFollowerId, userFollowingName) => {
    const getUserFollowingId = axios.get(`${dbConnect}/user/username/${userFollowingName}/`).then(res => res.data.id)
    
    const checkFollowing = getUserFollowingId.then(userFollowingId => axios.get(`${dbConnect}/follow/checkFollowing/${userFollowerId}/${userFollowingId}`).then(res => res.data))

    return Promise.all([getUserFollowingId, checkFollowing]).then(allData => {
        const userFollowingId = allData[0];
        const followData = allData[1];

        if(followData){
            return { userFollowerId, userFollowingId, dbFollowId: followData.id, following: true }
            
        } else {
            return { userFollowerId, userFollowingId, dbFollowId: null, followData:{}, following: false }
        }
    })
};

FollowService.createFollow = (userFollowerId, userFollowingId) => {
    return axios.post(`${dbConnect}/follow/`, { user_follower_id: userFollowerId, user_following_id: userFollowingId })
    .then(res => res.data.followId)
};

FollowService.deleteFollow = dbFollowId => {
    return axios.delete(`${dbConnect}/follow/${dbFollowId}`)
    .then(res => res.data)
};

export default FollowService;