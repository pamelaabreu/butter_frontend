import axios from 'axios';
import firebase from '../firebase';

const LoginService = {};

LoginService.firebaseLogin = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

LoginService.login = uid => axios.get(`http://localhost:3000/login/${uid}`).then(res => res.data.id)

export default LoginService;