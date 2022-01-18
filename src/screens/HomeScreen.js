import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Button } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import ProfileCard from '../components/ProfileCard'
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB'

class UserScreen extends Component {

	constructor() {
		super();
		this.state = {
			isLoading: true,
			myProfileCard: '',
			user: {}
		};
	}

	signout() {
    auth().signOut();
    this.props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  fetchData() {
  	const ref = firebase.firestore().collection('users').doc(auth().currentUser.uid);
		ref.get().then(res => {
			if (res.exists) {
				const user = res.data();
				this.setState({
					user: user,
					myProfileCard: <ProfileCard rerender={true} userkey={auth().currentUser.uid}/>,
					isLoading: false,
				});
			} else {
				console.log("Document does not exist!");
			}
		});
  }

	componentDidMount() {
		this.fetchData();

		this.focusListener = this.props.navigation.addListener(
			'focus', 
			() => { this.fetchData(); }
		);

		
	}

	componentWillUnmount() {
		this.focusListener();
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
			<Text style={{...styles.text, textAlign: 'center'}}>Welcome {auth().currentUser.displayName}</Text>
			<View style={styles.line}/>
				<Text style={styles.text}>My Matches</Text>
				<ScrollView style={styles.container} horizontal={true}>
				{
					this.state.user.matches.map((item, i) => {
						if (item) {
							return (
							<ListItem key={i} >
								<ProfileCard userkey={item}/>
							</ListItem>
							);
						} else {
							<Text>When someone likes you back, your matches will go here!</Text>
						}
					})
				}
				</ScrollView>

				<View style={styles.line}/>
				<Text style={styles.text}>My Likes</Text>
				<ScrollView style={styles.container} horizontal={true}>
					{
						this.state.user.likes.map((item, i) => {
							if (item) {
								return (
									<ListItem key={i} >
										<ProfileCard userkey={item}/>
									</ListItem>

									);
							} else {
								<Text>Open a pack to send a like!</Text>
							}
						})
					}
				</ScrollView>

				<View style={styles.line}/>
				<View style={styles.fieldRow}>
					<Text style={styles.text}>My Profile</Text>
					<Button title="Edit"
						style={{position: 'absolute', right: 0}}
						onPress={() => {
							this.props.navigation.navigate(
								'EditProfileScreen', 
								{
									userkey: auth().currentUser.uid,
									gender: this.state.user.gender,
									name:this.state.user.name,
									bio: this.state.user.bio,
									sPref: this.state.user.sPref,
									pics: this.state.user.pics,
								}
							)
						}}/>
				</View>
				<View style={styles.container}>
					{this.state.myProfileCard}
					{/* <ProfileCard userkey={auth().currentUser.uid}/> */}
				</View>

				<View style={{ marginTop: 30, marginBottom: 30 }}>
	        <Button title="Signout" onPress={this.signout} />
	      </View>
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
    padding: 20
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
  fieldRow: {
  	flexDirection: 'row',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
})


export default UserScreen;