import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import ProfileCard from '../components/ProfileCard';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB';
import { uniqueNamesGenerator, adjectives } from 'unique-names-generator';

class UserScreen extends Component {

	constructor() {
		super();
		this.state = {
			// animation: new Animated.ValueXY({x:30, y:30}),
			animation: new Animated.Value(0),
			matches: [],
			likes: [],
			isLoading: true,
			packUsers: [],
			opacity: 1
		};
	}

	StartAnimation = () => {
		this.setState({opacity: 0.5})
		this.GetUsers([auth().currentUser.uid]);
		Animated.timing(this.state.animation, {
			// toValue: {x: 250, y: 250},
			toValue: 100,
			duration: 1000,
			useNativeDriver: true
		}).start()
	}

	GetUsers = (forbiddenUsers) => {
		console.log(forbiddenUsers)
		firebase.firestore().collection('users')
		.where(firebase.firestore.FieldPath.documentId(), 'not-in', forbiddenUsers)
		.limit(8)
		.get()
		.then(querySnapshot => {
			console.log(querySnapshot.docs.map(a => a.id))
			this.setState({packUsers: querySnapshot.docs.map(a => a.id)})
			return querySnapshot.docs.map(a => a.id);
		});
	}

	CreateUsers = () => {
		var gender = 'male'
		const xml = new XMLHttpRequest();
		xml.open("GET", 'https://randomuser.me/api/?gender='+gender, false);
		xml.send(null);
		const obj = JSON.parse(xml.response)
		const url = obj.results[0].picture.large
	}

	componentDidMount() {
		const uid = auth().currentUser.uid;
		const ref = firebase.firestore().collection('users').doc(uid);
		ref.get().then(res => {
			if (res.exists) {
				const user = res.data();
				const packUsers = this.GetUsers(user.matches.concat(user.likes, [uid]))
				this.setState({
					matches: user.matches,
					likes: user.likes,
					isLoading: false,
					// packUsers: packUsers
				});
			} else {
				console.log("Document does not exist!");
			}
		});
	}


	render() {
		const xVal = this.state.animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
    });
    // const yVal = this.state.animation.interpolate({
    //   inputRange: [0, 50],
    //   outputRange: [0, 50],
    // });

    const animStyle = {
      transform: [
        {
          translateX: xVal,
        },
        // {
        // 	translateY: yVal
        // }
      ],
    };
    return (
      <ScrollView style={styles.container} horizontal={true}>
        <TouchableOpacity onPress={this.StartAnimation}>
          <Animated.View style={[styles.image1, animStyle]}>
          	<Image style={{...styles.image1, opacity: this.state.opacity}}
                source={require('../../public/images/aquarius-cardback.png')}/>
          </Animated.View>
        </TouchableOpacity>
				{/* { */}
				{/* 	this.state.packUsers.map((item, i) => { */}
				{/* 		if (item) { */}
				{/* 			return ( */}
				{/* 				<ListItem */}
				{/* 					key={i}> */}
				{/* 					<Animated.View style={[styles.image1, animStyle]}> */}
				{/* 	        	<ProfileCard userkey={item}/> */}
				{/* 	        </Animated.View> */}
				{/* 					</ListItem> */}
				{/* 			); */}
				{/* 		} */}
				{/* 	}) */}
    {/*     } */}
    	 <Text>{this.state.packUsers}</Text>
      </ScrollView>
    );

  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ball: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32
    },
    image1: {
	    marginLeft: 100,
	    // marginTop: 100,
	    width: 100,
	    height: 500,
	    resizeMode: 'contain',

  	},
});


export default UserScreen;