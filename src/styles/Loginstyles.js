import React, { Component } from 'react'
import { Dimensions } from 'react-native';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default styles = {

    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: 'lightblue',
        width: 300,
        marginVertical: 30,
        fontSize: 25,
        padding: 10,
        borderRadius: 8,
    },
    text: {
        fontSize: 25,
    },
    
    fullwidthHeight: {
        width: width,
        height: height,
        justifyContent: 'center'
    },
    boxStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    buttonDiv: {
        backgroundColor: 'white',
        marginTop: 76,
        marginBottom: 16,
        justifyContent: 'center'
    },
    buttonDivText: {
        color: 'red',
        textAlign: 'center'
    },
    marginLR: {
        marginHorizontal: 18
    },
    textWhite:
        { fontSize: 18, color: 'white', paddingBottom: 5 },
    viewCardtype: {
        borderWidth: 1, borderColor: 'white', shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,

    },
    inputText: { height: 40, marginTop: 15, marginBottom: 15, color: 'white' }

}