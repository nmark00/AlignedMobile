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
    inputNumber: {
        borderWidth: 2,
        borderColor: 'lightblue',
        width: 220,
        marginVertical: 30,
        fontSize: 20,
        padding: 10,
        borderRadius: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: 'lightblue',
        width: 300,
        marginVertical: 30,
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
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
    codePicker: {
        marginVertical: 30,
        paddingTop: 10,
        transform: [{scaleX: .7}, {scaleY: .7}]
    },
    fieldRow: {
        flexDirection: 'row'
    }
    
    // fullwidthHeight: {
    //     width: width,
    //     height: height,
    //     justifyContent: 'center'
    // },
//     boxStyle: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 9,
//         },
//         shadowOpacity: 0.48,
//         shadowRadius: 11.95,
// 
//         elevation: 18,
//         backgroundColor: 'rgba(0, 0, 0, 0.7)'
//     },
    // buttonDiv: {
    //     backgroundColor: 'white',
    //     marginTop: 76,
    //     marginBottom: 16,
    //     justifyContent: 'center'
    // },
    // buttonDivText: {
    //     color: 'red',
    //     textAlign: 'center'
    // },
//     marginLR: {
//         marginHorizontal: 18
//     },
//     textWhite:
//         { fontSize: 18, color: 'white', paddingBottom: 5 },
//     viewCardtype: {
//         borderWidth: 1, borderColor: 'white', shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 9,
//         },
//         shadowOpacity: 0.48,
//         shadowRadius: 11.95,
//         elevation: 18,
// 
//     },
//     inputText: { height: 40, marginTop: 15, marginBottom: 15, color: 'white' }

}