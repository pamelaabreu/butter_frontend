import dbConnect from './dbConnect';

import axios from 'axios';
import firebase from '../firebase';

const SignupService = {};

SignupService.createFirebaseUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

SignupService.createDbUser = (birthname, username, email, firebase_uid, profile_img, birthday, joining_reason) => {
    return axios.post(`${dbConnect}/user/`, {
        birthname, 
        username, 
        email, 
        firebase_uid, 
        profile_img,
        birthday, 
        joining_reason
    })
};

export default SignupService;