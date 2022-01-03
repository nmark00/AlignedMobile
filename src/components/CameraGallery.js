import React, { Component } from 'react';
import { View, Button, Image, TouchableOpacity, ActionSheetIOS } from 'react-native';
// import { Icon } from 'react-native-elements'
import * as ImagePicker from 'react-native-image-picker';

class CameraGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            isSelected: false
        };
    }

    createThreeButtonAlert = () => 
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', "Retake Photo", "Delete"],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 2) {
                    this.setState({isSelected: false, uri: ''});
                    this.props.getImage('');
                } else if (buttonIndex === 1) {
                    this.getImage();
                }
            }
        );

    getImage = () => {
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
            this.props.getImage(response.uri)
            this.setState({isSelected: true, uri: decodeURI(response.uri)})
        });
    }




    render() {
        if (this.state.isSelected)
            return (
                <TouchableOpacity onPress={this.createThreeButtonAlert}>
                    <Image style={{width: 70, height: 70}}
                    source={{uri:this.state.uri}}
                    />
                </TouchableOpacity>
            )

        return (
            <View transparent>
                <Button title='Take Picture' color='#19AC52' fontSize={32} onPress={this.getImage} />
            </View>
        );
    }
}

export default CameraGallery;