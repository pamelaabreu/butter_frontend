import dbConnect from './dbConnect';

import axios from 'axios';

const HomeService = {};

HomeService.getAllFollowingsPosts = (dbUid) => {
    const getUsersFollowings = axios.get(`${dbConnect}/follow/${dbUid}/readAllFollowings`).then(res => res.data)
    
    const getFollowingUsersPosts = getUsersFollowings.then(users => {
      return users.map(e => {
        return axios.get(`${dbConnect}/post/all/${e.user_id}`).then(res => {
          const followingUserPosts = res.data;
          const followingUser = e;
          return { followingUser, followingUserPosts }
        })
      })
    })
    .then(followingUsersPosts => Promise.all(followingUsersPosts))

    return getFollowingUsersPosts;
};

HomeService.getAllPosts = () => {
 const allPosts = axios.get(`${dbConnect}/post/allPosts/all`).then(({data}) => data.slice(0).reverse())

 const getUsernameForPosts = allPosts.then(posts => {
   return posts.map(e => {
     return axios.get(`${dbConnect}/user/${e.user_posted_id}`).then(res => {
       const userInfo = res.data;
       const postInfo = e;
       return { postInfo, userInfo }
     })
   })
 })
 .then(postsWithUserInfo => Promise.all(postsWithUserInfo))

 return getUsernameForPosts;
};

export default HomeService;