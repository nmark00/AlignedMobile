import React, { Component } from 'react'
// import { Dimensions } from 'react-native';
// 
// const height = Dimensions.get('screen').height
// const width = Dimensions.get('screen').width

export default styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: 320,
    height: 470,
  },
  card: {
    width: 320,
    height: 470,
    zIndex: -1,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardR: {
    // marginLeft: -150,
    width: 160,
    height: 300,
  },
  cardL: {
    marginLeft: -310,
    width: 160,
    height: 300,
  },
  card1: {
    backgroundColor: '#FE479C',
    width: 320,
    height: 170,
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    zIndex: 999,
    // lineHeight: 270,
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'System',
    color: '#ffffff',
    color: '#000000',
    // marginLeft: -50,
    backgroundColor: 'transparent',
  },
  image1: {
    marginLeft: 10,
    width: 300,
    height: 300
  },
  loadingWheel: {
    color: "#AEAEAE",
    height: 180,
    width: 180,
    marginLeft: 68,
    marginTop: 60
  },
  fieldRow: {
    flexDirection: 'row'
  },

}