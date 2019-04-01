import firebase from '../firebase';

export default (file, uid) => {
    const root = firebase.storage().ref();
    const userFolder = root.child(`/${uid}`);
    const newImage = userFolder.child(file.name);

    return newImage.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => url)
    .catch(err => err)
};