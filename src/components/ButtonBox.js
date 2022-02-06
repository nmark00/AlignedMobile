import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity ,Alert} from 'react-native';

export default class Myproject extends Component {

  render() {

    return (
       
       <TouchableOpacity
          style={{...styles.SubmitButtonStyle,
            backgroundColor: this.props.color,
            width: this.props.width,
            height: this.props.height
          }}
          activeOpacity = { .5 }
          onPress={ this.props.action }
       >

            <Text style={styles.TextStyle}>{this.props.text}</Text>
            
      </TouchableOpacity>


    );
  }
}

const styles = StyleSheet.create({

  SubmitButtonStyle: {
    width: 150,
    height: 50,
    backgroundColor: '#00BCD4',
    // marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    // marginLeft:30,
    // marginRight:30,
    borderRadius:10,
    // borderWidth: 1,
    // borderColor: '#fff'
  },

  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 21
  }

});
