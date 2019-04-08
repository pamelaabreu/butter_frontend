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

UserService.getHoroscopeSign = (date) => {
    const birthday = date.split('-')
    const month = parseInt(birthday[1]);
    const day = parseInt(birthday[2]);
    let sign = '';
    
      if(month === 1){
        if(day >= 21){
          sign = 'Aquarius';
        } else sign = 'Capricorn';
      }
      else if (month === 2){
        if(day >= 20){
          sign = 'Pisces';
        } else sign = 'Aquarius';
      }
      else if (month === 3){
        if(day >= 21){
          sign = 'Aries';
        } else sign = 'Pisces';
      }
      else if (month === 4){
        if(day >= 21){
          sign = 'Taurus';
        } else sign = 'Aries';
      }
      else if (month === 5){
        if(day >= 22){
          sign = 'Gemini';
        } else sign = 'Taurus';
      }
      else if (month === 6){
        if(day >= 22){
          sign = 'Cancer';
        } else sign = 'Gemini';
      }
      else if (month === 7){
        if(day >= 23){
          sign = 'Leo';
        } else sign = 'Cancer';
      }
      else if (month === 8){
        if(day >= 23){
          sign = 'Virgo';
        } else sign = 'Leo';
      }
      else if (month === 9){
        if(day >= 24){
          sign = 'Libra';
        } else sign = 'Virgo';
      }
      else if (month === 10){
        if(day >= 24){
          sign = 'Scorpio';
        } else sign = 'Libra';
      }
      else if (month === 11){
        if(day >= 23){
          sign = 'Sagittarius';
        } else sign = 'Scorpio';
      }
      else if (month === 12){
        if(day >= 22){
          sign = 'Capricorn';
        } else sign = 'Sagittarius';
      }
    return sign;
}

export default UserService;
