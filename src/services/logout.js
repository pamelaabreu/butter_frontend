import firebase from '../firebase';

const LogoutService = {};

LogoutService.logout = () => firebase.auth().signOut()

export default LogoutService;