import axios from 'axios';
const FollowService = {};

FollowService.checkUserFollowing = (userFollowerId, userFollowingName) => {
    const getUserFollowingId = axios.get(`http://localhost:3000/user/username/${userFollowingName}/`).then(res => res.data.id)
    
    const checkFollowing = getUserFollowingId.then(userFollowingId => axios.get(`http://localhost:3000/follow/checkFollowing/${userFollowerId}/${userFollowingId}`).then(res => res.data))

    return Promise.all([getUserFollowingId, checkFollowing]).then(allData => {
        const userFollowingId = allData[0];
        const followData = allData[1];

        if(followData){
            return { userFollowerId, userFollowingId, dbFollowId: followData.id, following: true }
            
        } else {
            return { userFollowerId, userFollowingId, dbFollowId: null, followData:{}, following: false }
        }
    })
}

export default FollowService;