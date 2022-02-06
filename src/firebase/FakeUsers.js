import React from 'react'
import firebase from '../firebase/firebaseDB';
const geofire = require('geofire-common');

// vv THESE FUNCTIONS CREATE FAKE USERS IN FIREBASE vv
function AddGeo() {
	firebase.firestore().collection('users')
	.get()
	.then(snap => {
		snap.forEach(doc => {
			let lat = Math.random() * 1 + 34;
			let lng = Math.random() * 1 - 119;
			let hash = geofire.geohashForLocation([lat, lng]);
			doc.ref.update({
				geohash: hash,
				lat: lat,
				lng: lng
				// d: {coordinates: new firebase.firestore.GeoPoint(lat, lng), name: 'Geofirestore'},
				// coordinates: new firebase.firestore.GeoPoint(lat, lng)
			})
		})
	})
}


function GetImgURL(gender) {
	return fetch("https://randomuser.me/api/?gender="+gender)
	.then(response => response.json())
	.then(obj => {
		return obj.results[0].picture.large
	});
}
function GetUserText(gender) {
	return fetch("https://api.namefake.com/english/"+gender)
	.then(response => response.json())
	.then(obj => {
		return {
			name: obj.name,
			bday: obj.birth_data,
			bio: obj.address
		}
	});
}

export async function CreateUsers(packSize) {
	const genders = ['male', 'female']
	for (var i = 0; i < packSize; i++) {
		const gender = genders[Math.floor(Math.random()*2)]
		const sPref = [... new Set([genders[Math.floor(Math.random()*2)],genders[Math.floor(Math.random()*2)]])]
		const picURL = await GetImgURL(gender);
		const user0 = await GetUserText(gender);
		
		const lat = Math.random() * 1 + 34;
		const lng = Math.random() * 1 - 119;
		const hash = geofire.geohashForLocation([lat, lng]);

		const userObj = {
			...user0,
			pics: [picURL],
			gender: gender,
			likes: [],
			matches: [],
			sPref: sPref,
			geohash: hash,
			lat: lat,
			lng: lng
		}
		console.log(userObj);
		await firebase.firestore().collection('users').doc().set(userObj)
	}
	
}

// ^^ THESE FUNCTIONS CREATE FAKE USERS IN FIREBASE ^^

export function UpdateUser() {
	
}