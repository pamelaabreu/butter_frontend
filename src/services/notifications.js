import dbConnect from './dbConnect';

import axios from 'axios';

const NotificationService = {};

NotificationService.getNotifs = (dbUid) => {
    return axios.get(`${dbConnect}/notification/${dbUid}/readAllNotifications`).then(res => res.data)
};

export default NotificationService;