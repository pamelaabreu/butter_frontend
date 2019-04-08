import axios from 'axios';
const UserService = {};

UserService.getUsersInfo = (dbUsername) => {
    const getUserData = axios.get(`http://localhost:3000/user/username/${dbUsername}/`).then(res => res.data)

    const getFollowers = getUserData.then(({id}) => axios.get(`http://localhost:3000/follow/${id}/readAllFollowers`).then(res => res.data))
    
    const getFollowings = getUserData.then(({id}) => axios.get(`http://localhost:3000/follow/${id}/readAllFollowings`).then(res => res.data))

    const getAllPosts = getUserData.then(({id}) => axios.get(`http://localhost:3000/post/all/${id}`).then(res => res.data))
            
    return Promise.all([getUserData, getFollowers, getFollowings, getAllPosts]).then(allData => {
            const userInfo = allData[0];
            const userFollowers = allData[1];
            const userFollowings = allData[2];
            const userPosts = allData[3];

            return { userInfo, userFollowers, userFollowings, userPosts };
        })

};

export default UserService;
