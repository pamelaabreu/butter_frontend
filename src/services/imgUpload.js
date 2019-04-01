import firebase from '../firebase';

const ImageService = {};

ImageService.imageUpload = (file, uid) => {
    const root = firebase.storage().ref();
    const userFolder = root.child(`/${uid}`);
    const newImage = userFolder.child(file.name);

    return newImage.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => url)
    .catch(err => err)
};

export default ImageService;