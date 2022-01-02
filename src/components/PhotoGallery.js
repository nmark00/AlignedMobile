import React, { Component } from 'react';
import { View, Button } from 'react-native';
// import { Icon } from 'react-native-elements'
import * as ImagePicker from 'react-native-image-picker';

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IMAGE_URI: ''
        };
    }
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


        ImagePicker.launchImageLibrary(options, (res) => {
            if (!res.assets) return;
            const response = res.assets[0]
            console.log('Response = ', response);
            this.setState({
                IMAGE_URI: response
            })
            const { IMAGE_URI } = this.state
            const source = { uri: response.uri };
            this.props.getImage(response.uri, IMAGE_URI)
        });
    }




    render() {
        return (
            <View transparent>
                <Button title='Select Image' color='#19AC52' fontSize={32} onPress={this.getImage} />
            </View>
        );
    }
}

export default PhotoGallery;