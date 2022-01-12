import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import ProfileCard from '../components/ProfileCard'
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB'

class UserScreen extends Component {

	constructor() {
		super();
		this.state = {
			isLoading: true,
			matches: [],
			likes: []
		};
	}

	componentDidMount() {
		const ref = firebase.firestore().collection('users').doc(auth().currentUser.uid);
		ref.get().then(res => {
			if (res.exists) {
				const user = res.data();
				this.setState({
					matches: user.matches,
					likes: user.likes,
					isLoading: false
				});
				console.log(user.matches)
			} else {
				console.log("Document does not exist!");
			}
		});
	}


	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.preloader}>
					<ActivityIndicator size="large" color="#9E9E9E"/>
				</View>
			)
		}
		return (
			<ScrollView>
				<Text style={styles.text}>Matches</Text>
				<ScrollView style={styles.container} horizontal={true}>
				{
					this.state.matches.map((item, i) => {
						if (item) {
							return (
							<ListItem
								key={i}
								bottomDivider
								onPress={()=> {
									this.props.navigation.navigate('UserDetailScreen', {
										userkey: item
									});
								}}>
								<ProfileCard userkey={item}/>
							</ListItem>
							);
						} else {
							<Text>When someone likes you back, your matches will go here!</Text>
						}
					})
				}
				</ScrollView>
				<Text style={styles.text}>Likes</Text>
				<ScrollView style={styles.container} horizontal={true}>
					{
						this.state.likes.map((item, i) => {
							if (item) {
								return (
									<ListItem
										key={i}
										bottomDivider
										onPress={()=> {
											this.props.navigation.navigate('UserDetailScreen', {
												userkey: item
											});
										}}>
										<ProfileCard userkey={item}/>
									</ListItem>

									);
							} else {
								<Text>Open a pack to send a like!</Text>
							}
						})
					}
				</ScrollView>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  text: {
    fontSize: 21,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {

  }
})


export default UserScreen;