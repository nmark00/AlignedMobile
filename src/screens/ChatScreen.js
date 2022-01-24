import React, { Component } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { View, Keyboard, KeyboardAvoidingView } from 'react-native';
import firebase from '../firebase/firebaseDB'


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: this.props.route.params.userkey
      },
      isLoadingEarlier: false,
      messages: []
    }
    this.ref = firebase.database().ref('Messages');
  }

  onLoadEarlier = () => {
    this.setState(previousState => {
      return { isLoadingEarlier: true };
    }, () => {
      this.setState(previousState => {
        return { isLoadingEarlier: false }
      })
    })

  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };
  
  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToTop = 80;
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }

  renderBubble = props => {
    return (
      <Bubble
      {...props}
      wrapperStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15, left: 0 },
        }}
      containerToPreviousStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 },
        }}
      containerToNextStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}
      containerStyle={{
        right: { borderTopRightRadius: 15 },
        left: { borderTopLeftRadius: 15 },
      }}

      />
    );
  }
  inputToolbar = props => {
    return (
      <InputToolbar
      {... props}
      containerStyle={{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 20,
      }}

      />
    );
  }

  renderSend = props => {
    return (
      <Send
      {...props}
      containerStyle={{
        borderWidth: 0,
      }}
      />
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.state.user}
          bottomOffset={75}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.inputToolbar}
          renderSend={this.renderSend}
          renderAvatar={null}
//           listViewProps={{
//             scrollEventThrottle: 400,
//             onScroll: ({ nativeEvent }) => {
//               if (this.isCloseToTop(nativeEvent)) {
//                 this.setState({ isLoadingEarlier: true });
// 
//               }
//             }
//           }}
        />
      </View>
    );
  }

  componentDidMount() {
    this.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this.ref.off();
  }
}

export default Chat;
