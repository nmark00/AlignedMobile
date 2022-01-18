import uuid from 'react-native-uuid'
import React from 'react'
import CameraGallery from '../components/CameraGallery';
import firebase from '../firebase/firebaseDB'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage'
import Geocoder from 'react-native-geocoding';


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
    .then(() => {
        ref.getDownloadURL()
        .then(url => {
            firebase.firestore()
            .collection('users').doc(userId)
            .set({pics: firebase.firestore.FieldValue.arrayUnion(url)}, {merge: true})
        })
    })
}

export function Geocoding(city) {
    return Geocoder.from(city)
    .then(json => {
        return json.results[0].geometry.location;
    })
}

export function GeneratePack(forbiddenUsers, limit) {
    return firebase.firestore().collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'not-in', forbiddenUsers)
    .limit(limit)
    .get()
    .then(querySnapshot => {
        console.log(querySnapshot.docs.map(a => a.id))
        return querySnapshot.docs.map(a => a.id);
    });
}