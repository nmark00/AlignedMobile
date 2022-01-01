import uuid from 'react-native-uuid'
import React from 'react'
import CameraGallery from '../components/CameraGallery';
import firebase from '../firebase/firebaseDB'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage'



// USAGE: 
// <CameraGallery getImage={(url, base) => uploadImage(url, base)} />
export function uploadImage(imageBlob) {
    const uri = imageBlob;
    const fileName = uuid.v4();
    const userId = auth().currentUser.uid;
    const ref = storage().ref(`users/${userId}/${fileName}`);
    ref.putFile(uri)
    .then(() => {
        console.log(uri )
    }).catch(e => console.log('uploading image error => ', e))
    // .then(() => {
    //     ref.getDownloadURL()
    //     .then(url => {
    //         firebase.firestore()
    //         .collection('users').doc(userId)
    //         .update({pics: firebase.firestore.FieldValue.arrayUnion(url)})
    //     })
    // })
}