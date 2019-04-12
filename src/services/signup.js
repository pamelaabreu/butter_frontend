import axios from 'axios';
import firebase from '../firebase'

const SignupService = {};

SignupService.createFirebaseUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

SignupService.createDbUser = (birthname, username, email, firebase_uid, profile_img, birthday, joining_reason) => {
    return axios.post('http://localhost:3000/user/', {
        birthname, 
        username, 
        email, 
        firebase_uid, 
        profile_img,
        birthday, 
        joining_reason
    })
}

export default SignupService;