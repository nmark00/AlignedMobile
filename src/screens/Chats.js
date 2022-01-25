import React, { Component } from 'react';
import { RefreshControl, StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from '../firebase/firebaseDB'
import auth from '@react-native-firebase/auth';

const lastWeekDif = 7 * 24 * 60 * 60 * 1000;

class Chats extends Component {

	constructor() {
		super();
		// this.firestoreRef = firebase.firestore().collection('users');
		this.state = {
			isLoading: true,
			uid: auth().currentUser.uid,
			userArr: [], //key and name of matches
			matches: [], //uid of matches
			refreshing: false
		};
		
	}

	convertMils2Date = (mils) => {
		var date = new Date(mils);
		const dateString = date.toLocaleDateString();

		if (dateString == new Date().toLocaleDateString()){
			var hours = date.getHours();
			var xm = hours > 11 ? 'PM' : 'AM';
			var mins = '0' + date.getMinutes();
			return (hours%12) + ':' + mins.substr(-2) + ' ' + xm;
		}
		else if(mils > new Date() - lastWeekDif)
			return date.toLocaleDateString('en-US',{weekday: 'long'});
		else
			return dateString;
	}

	convertText = (text) => {
		if (text.length > 50)
			return text.substring(0,50) + '...';
		else
			return text;
	}

	fetchData = () => {
		this.setState({refreshing: true})

		const firestoreRef = firebase.firestore().collection('users');
		const uid = auth().currentUser.uid;

    this.unsubscribe = firestoreRef.doc(uid)
    .onSnapshot(res => {
      const user = res.data();
      this.setState({matches: user.matches})

      //START OF 2ND SNAPSHOT
      firestoreRef
      .where(firebase.firestore.FieldPath.documentId(), 'in', user.matches)
      .onSnapshot(querySnapshot => {
      	const userArr = [];
      	querySnapshot.forEach(res => {
      		firebase.database().ref(`Messages/${[res.id, uid].sort().join('')}`)
      		.limitToLast(1)
      		.on('child_added', snapshot => {
      					const { createdAt, text } = snapshot.val();
      					userArr.push({
      						key: res.id,
      						name: res.data().name,
      						timestamp: this.convertMils2Date(createdAt),
      						text: this.convertText(text)
      					})
      				});
      		
      	});
      	this.setState({ userArr, isLoading: false })

      }); //end of 2nd onSnapshot
    }); //end of 1st onSnapshot
    this.setState({refreshing: false})
	}

	componentDidMount() {
		this.fetchData();

		this.focusListener = this.props.navigation.addListener(
			'focus', 
			() => { this.fetchData(); }
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
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
			<ScrollView style={styles.container}
				refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchData}/> }
			>
				{
					this.state.userArr
					.sort((a,b) =>(a.timestamp < b.timestamp) ? 1 : -1)
					.map((item, i) => {
						return (
							<ListItem.Swipeable
								key={i}
								bottomDivider
								onPress={()=> {
									this.props.navigation.navigate('ChatScreen', {
										userkey: [item.key, this.state.uid].sort().join(''),
										uid: this.state.uid
									});
								}}>
								<View style={{flex: 1}}>
									<ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
									<ListItem.Subtitle style={styles.timestamp}>{item.timestamp}</ListItem.Subtitle>	
									<ListItem.Subtitle style={styles.subText}>{item.text}</ListItem.Subtitle>
								</View>
								<ListItem.Chevron />
								
							</ListItem.Swipeable>

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
  },
  timestamp: {
  	textAlign: 'right',
  	marginTop: -30
  },
  subText: {
  	textAlign: 'left',
  	paddingLeft: 50,
  	paddingTop: 10,
  	color: 'gray',
  	marginRight: 10
  },
  title: {
  	textAlign: 'left',
  	fontWeight: 'bold'
  }
})


export default Chats;