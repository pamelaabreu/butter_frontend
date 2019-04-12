import axios from 'axios';
import firebase from '../firebase'

const SignupService = {};

SignupService.createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export default SignupService;