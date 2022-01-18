import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from '../firebase/firebaseDB'

class Chats extends Component {

	constructor() {
		super();
		this.firestoreRef = firebase.firestore().collection('users');
		this.state = {
			isLoading: true,
			userArr: []
		};
	}

	getCollection = (querySnapshot) => {
		const userArr = [];
		querySnapshot.forEach(res => {
			const {name, bio, gender, astro} = res.data();
			userArr.push({
				key: res.id,
				res,
				name,
				gender,
				astro,
				bio,
			});
		});
		this.setState({ userArr, isLoading: false});
	}

	componentDidMount() {
		this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
	}

	componentWillUnmount() {
		this.unsubscribe();
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
			<ScrollView style={styles.container}>
				{
					this.state.userArr.map((item, i) => {
						return (
							<ListItem
								key={i}
								bottomDivider
								onPress={()=> {
									this.props.navigation.navigate('EditProfileScreen', {
										userkey: item.key
									});
								}}>
								<ListItem.Title>{item.name}</ListItem.Title>
								<ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
							</ListItem>

							);
					})
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default Chats;