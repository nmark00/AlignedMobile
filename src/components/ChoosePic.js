import React, { Component } from 'react';
import { View, Button, Image, TouchableOpacity, ActionSheetIOS } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'react-native-image-picker';

class ChoosePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            isSelected: false
        };
    }

    createTwoButtonAlert = () => 
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', "Remove Photo"],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    this.setState({isSelected: false, uri: ''});
                    this.props.getImage('');
                } 
            }
        );

    createThreeButtonAlert = () => 
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', "Take Photo", "Photo Library"],
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 2) {
                    this.choosePhoto();
                } else if (buttonIndex === 1) {
                    this.takePhoto();
                }
            }
        );

    takePhoto = () => {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select your image',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchCamera(options, (res) => {
            if (!res.assets) return;
            const response = res.assets[0]
            console.log('Response = ', response);
            const picUri = decodeURI(response.uri);
            this.props.getImage(picUri)
            this.setState({isSelected: true, uri: picUri})
        });
    }
    choosePhoto = () => {
        const options = {
            title: 'Select your image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, (res) => {
            if (!res.assets) return;
            const response = res.assets[0]
            console.log('Response = ', response);
            const picUri = decodeURI(response.uri);
            this.props.getImage(picUri)
            this.setState({isSelected: true, uri: picUri})
        });
    }




    render() {
        if (this.state.isSelected)
            return (
                <TouchableOpacity onPress={this.createTwoButtonAlert}>
                    <Image style={{width: 70, height: 70}}
                    source={{uri:this.state.uri}}
                    />
                </TouchableOpacity>
            )

        return (
            <TouchableOpacity onPress={this.createThreeButtonAlert}>
                <FontAwesome5 name={'plus-square'} size={50} color={'gray'} />
            </TouchableOpacity>
        );
    }
}

export default ChoosePic;