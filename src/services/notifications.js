import axios from 'axios';

const NotificationService = {};

NotificationService.getNotifs = (dbUid) => {
    return axios.get(`http://localhost:3000/notification/${dbUid}/readAllNotifications`).then(res => res.data)
}

export default NotificationService;