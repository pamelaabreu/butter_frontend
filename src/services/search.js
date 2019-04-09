import axios from 'axios';
const SearchService = {};

SearchService.getFollowData = (user, id) => {
    const getFollowers = axios.get(`http://localhost:3000/follow/${id}/readAllFollowers`).then(res => res.data)
    const getFollowings = axios.get(`http://localhost:3000/follow/${id}/readAllFollowings`).then(res => res.data)

    return Promise.all([getFollowers, getFollowings]).then(allData => {
        const usersFollowers = allData[0];
        const usersFollowing = allData[1];

        return { user, usersFollowers, usersFollowing }
    })
};

SearchService.getSearchResults = (input) => {
    return axios.get('http://localhost:3000/user/all')
        .then(res => res.data )
        .then(data => {
            return data.filter((e) => {
                const isTrue = e.username.toLowerCase().includes(input.toLowerCase());

                if(isTrue){
                    return e;
                };
            })
        })
        .then(users => {
            return users.map(e => {
                return SearchService.getFollowData(e, e.id) 
            })
        })
        .then(usersWithFollow => Promise.all(usersWithFollow))
};

export default SearchService;