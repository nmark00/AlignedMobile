import React, { Component } from 'react';
import Login from '../screens/Login';
// import firebase from 'react-native-firebase';
import firebase from '../firebase/firebaseDB'
// import { Text, Button, Card } from 'native-base';
import { View, ActivityIndicator, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
// import { withNavigation } from 'react-navigation';
// import SpinnerComponent from '../Loader/LoaderView.js';
import styles from '../styles/Loginstyles';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+91',
            confirmResult: null,
            loading: false,
            userName: '',
            email: '',
            phoneNo: '977112345',
            userId: ''

        };
    }

    // FUNCTION FUNCTION FUNCTION
    // This gets called last. It'll check if auth() is changed
    // If so, the auth object is set to a user, and user is set to
    // our state's user.
    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                alert(console.log(user));
            } else {
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+91',
                    confirmResult: null, // obj used to confirm OPT
                });
                alert('no user exist');

            }
        });
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    // FUNCTION FUNCTION FUNCTION
    // After you enter your number, it'll set confirmResult to 
    // store the object associated w/ your number. Use this 
    // object to confirm the OPT code later
    signIn = async () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });
        await firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                alert('confirmResult' + confirmResult)
                this.setState({ confirmResult, message: 'Code has been sent!' });
            })
            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    };

    // FUNCTION FUNCTION FUNCTION
    // Takes the codeInput which you entered and confirmResult.
    // After you call signInWithPhoneNumber, it sets confirmResult
    // to a confirm object which can confirm your OPT code
    // Then this will create a new user
    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    alert(JSON.stringify(user.uid));
                    this.setState(
                        {
                            message: 'Code Confirmed!',
                            loading: true,
                            userId: user.uid,
                            phoneNo: user.phoneNumber
                        }
                    );
                    this.createUserDatabase()
                })
                .catch(error => {
                    this.setState({ message: `Code Confirm Error: ${error.message}` });
                });
        }
    };


    // FUNCTION FUNCTION FUNCTION
    createUserDatabase = () => {
        // Takes the data from the current state and
        // creates a new user with that data
        const { userName, phoneNo, userId } = this.state
        the_uid = userId
        const data = {
            name: userName,
            contact: phoneNo,
        }
        firebase.firestore().doc(`users/${the_uid}`).set(data)
            .then(() => {
                console.log("New poll data sent!")
            })
            .catch(error => console.log("Error when creating new poll.", error));
    }


    // COMPONENT COMPONENT COMPONENT
    // This ALWAYS shows up on LoginViews.
    // It tells the user what's going on
    renderMessage = () => {
        const { message } = this.state;
        if (!message.length) return null;
        return (
            <View style={styles.viewCardtype}>
                <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
            </View>
        );
    }

    // COMPONENT COMPONENT COMPONENT
    // This function renders text inputs for your username 
    // and OPT code. It has a button when pressed checks the code
    renderVerificationCodeInput = () => {
        const { codeInput, userName } = this.state;
        return (
            <Card style={styles.boxStyle}>
                <View style={{ marginTop: 25, padding: 25 }}>
                    <Text style={[styles.textWhite, styles.marginLR]}>Enter verification code below:</Text>
                    <View style={[styles.viewCardtype, styles.marginLR]}>

                        <TextInput
                            autoFocus
                            style={styles.inputText}
                            onChangeText={value => this.setState({ codeInput: value })}
                            placeholder={'Code ... '}
                            value={codeInput}
                            keyboardType='number-pad'
                            placeholderTextColor='white'

                        />
                    </View>
                    <View style={[styles.viewCardtype, styles.marginLR]}>

                        <TextInput
                            style={styles.inputText}
                            onChangeText={namevalue => this.setState({ userName: namevalue })}
                            placeholder={'Enter your name... '}
                            value={userName}
                            keyboardType='name-phone-pad'
                            placeholderTextColor='white'
                        />
                    </View>

                    <Button style={[styles.buttonDiv, styles.marginLR]} onPress={this.confirmCode}>
                        <Text style={styles.buttonDivText}>
                            Confirm Code
                    </Text>
                    </Button>
                </View>
            </Card>

        );
    }

    // FUNCTION FUNCTION FUNCTION
    // When LoginView enters a number, it automatically calls 
    //this function to change my state
    valueChange = (textValue) => {

        this.setState({ phoneNumber: textValue })
    }

    // FUNCTION FUNCTION FUNCTION
    goToMainPage = () => {
        // redirects to Home page
        const { navigation } = this.props;
        navigation.navigate('PageNavigation');
        console.log('skip is working')
    }

    // COMPONENT COMPONENT COMPONENT
    // After you hit signin in LoginViews, it'll call this.
    // This will give you the loading wheel while you are 
    // redirected to Home
    renderButton = () => {
        if (this.state.loading) {
          return (
            <View style={styles.preloader}>
              <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
            )
        }


        setTimeout(() => {
            this.setState({ loading: false })
            this.goToMainPage()
        }, 3000)

    }

    render() {
        const { user, confirmResult, codeInput, phoneNumber, loading } = this.state;
        return (
            <Login
                user={user}
                confirmResult={confirmResult}
                signOut={this.signOut}
                renderVerificationCodeInput={() => this.renderVerificationCodeInput()}
                renderMessage={() => this.renderMessage()}
                codeInput={codeInput}
                phoneNumber={phoneNumber}
                signIn={this.signIn}
                valueChange={(textValue) => this.valueChange(textValue)}
                goToMainPage={this.goToMainPage}
                renderButton={this.renderButton}
                loading={loading}
            />
        );
    }
}

export default LoginContainer;