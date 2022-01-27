import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import ProfileCard from '../components/ProfileCard';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB';
import { Geocoding } from '../firebase/crud';
import GeoFirestore from '../firebase/geofirestoreDB';
const geofire = require('geofire-common');

const LIMIT = 8;

class UserScreen extends Component {

	constructor() {
		super();
		this.state = {
			// animation: new Animated.ValueXY({x:30, y:30}),
			animation: new Animated.Value(0),
			matches: [],
			likes: [],
			lat: 0,
			lng: 0,
			canScroll: false,
			packUsers: [],
			picDidLoad: false

		};
	}

	StartAnimation = () => {
		this.setState({opacity: 0, canScroll: true})
		Animated.timing(this.state.animation, {
			// toValue: {x: 250, y: 250},
			toValue: 100,
			duration: 1000,
			useNativeDriver: true
		}).start()
	}

	GetUsers = (forbiddenUsers, matchingDocs) => {
		console.log("GetUsers")
		return firebase.firestore().collection('users')
		.where(firebase.firestore.FieldPath.documentId(), 'in', matchingDocs)
		// .where(firebase.firestore.FieldPath.documentId(), 'not-in', forbiddenUsers)
		.limit(LIMIT + forbiddenUsers.length)
		.get()
		.then(querySnapshot => {
			const potentials = querySnapshot.docs.map(a => a.id);
			const eligibles = potentials.filter(uid => !forbiddenUsers.includes(uid));
			const packUsers = eligibles.sort(() => .5 - Math.random()).slice(0, LIMIT);

			console.log("packusers: ",packUsers);
			return packUsers;
		});
	}
	queryHashes = (userLat, userLng) => {

		console.log("queryHashes")

		const center = [userLat, userLng];
		const radiusInM = 25 * 1600;

		const bounds = geofire.geohashQueryBounds(center, radiusInM);
		const promises = [];
		for (const b of bounds) {
		  const q = firebase.firestore().collection('users')
		    .orderBy('geohash')
		    .startAt(b[0])
		    .endAt(b[1]);

		  promises.push(q.get());
		}

		// Collect all the query results together into a single list
		return Promise.all(promises).then((snapshots) => {
		  const matchingDocs = [];

		  for (const snap of snapshots) {
		    for (const doc of snap.docs) {
		      const lat = doc.get('lat');
		      const lng = doc.get('lng');

		      // We have to filter out a few false positives due to GeoHash
		      // accuracy, but most will match
		      const distanceInKm = geofire.distanceBetween([lat, lng], center);
		      const distanceInM = distanceInKm * 1600;
		      if (distanceInM <= radiusInM) {
		        matchingDocs.push(doc.id);
		      }
		    }
		  }

		  return matchingDocs;
		});
	}


// vv THESE FUNCTIONS CREATE FAKE USERS IN FIREBASE vv
	AddGeo = () => {
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


	CreateUsers = async (packSize) => {
		const genders = ['male', 'female']
		for (var i = 0; i < packSize; i++) {
			const gender = genders[Math.floor(Math.random()*2)]
			const sPref = [... new Set([genders[Math.floor(Math.random()*2)],genders[Math.floor(Math.random()*2)]])]
			const picURL = await this.GetImgURL(gender);
			const user0 = await this.GetUserText(gender);
			const userObj = {
				...user0,
				pics: [picURL],
				gender: gender,
				likes: [],
				matches: [],
				sPref: sPref
			}
			console.log(userObj);
			await firebase.firestore().collection('users').doc().set(userObj)
		}
		
	}
	GetImgURL = (gender) => {
		return fetch("https://randomuser.me/api/?gender="+gender)
		.then(response => response.json())
		.then(obj => {
			return obj.results[0].picture.large
		});
	}
	GetUserText = (gender) => {
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
// ^^ THESE FUNCTIONS CREATE FAKE USERS IN FIREBASE ^^

	componentDidMount() {
		const uid = auth().currentUser.uid;
		const ref = firebase.firestore().collection('users').doc(uid);
		ref.get()
		.then(res => {
			const user = res.data();
			this.setState({
				matches: user.matches,
				likes: user.likes,
				lat: user.lat,
				lng: user.lng
			});
			return [user.lat, user.lng];
		})
		.then((coords) => {
			return this.queryHashes(coords[0],coords[1]);
		})
		.then((matchingDocs) => {
			const forbiddenUsers = this.state.matches.concat(this.state.likes, [uid]);
			const packUsers = this.GetUsers(forbiddenUsers, matchingDocs);
			return packUsers
		})
		.then(packUsers => this.setState({packUsers: packUsers}))
	}


	render() {
		// console.log(Geocoding("Los Angeles"))
		const animStyles = []
		for (var i = 0; i < LIMIT; i++) {
			const xVal = this.state.animation.interpolate({
				inputRange: [0, 100],
				outputRange: [-320*i-320, -320 + i*20]
			});
			animStyles.push({
				transform: [{ translateX: xVal }]
			});
		}

		let packImg;

		if (this.state.canScroll)
			packImg = <View style={{width: 320, marginLeft: 30}}></View>
		else
			packImg = <TouchableOpacity onPress={this.StartAnimation} style={{zIndex: 999}}>
					{!this.state.picDidLoad ? (<View style={styles.preloader}>
	                    <ActivityIndicator size="large" color="#9E9E9E"/>
	                </View>) : null}
          	<Image style={styles.image1}
                source={require('../../public/images/aquarius-cardback.png')}
                onLoad={()=>{this.setState({picDidLoad: true})}}/>
        </TouchableOpacity>

    return (
      <ScrollView style={[styles.container]} horizontal={true} scrollEnabled={this.state.canScroll}>
      	{packImg}
				{ this.state.packUsers.map((item, i) => {
						if (item && this.state.picDidLoad) {
							return (
								<Animated.View key={i} style={[{ marginTop: 40, height: 470, width: 320 }, animStyles[i]]}>
							       	<ProfileCard userkey={item} />
							      </Animated.View>
							);
						}
					})
				}
      </ScrollView>
    );

  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image1: {
	    marginLeft: 30,
	    marginTop: 10,
	    width: 320,
	    height: 600,
	    resizeMode: 'contain',
  	},
  	profileCard: {
  		marginTop: 70,
  		marginLeft: 30,
  		width: 300,
  		height: 470,
  	},
  	preloader: {
  		marginTop: 300
  	}
});


export default UserScreen;