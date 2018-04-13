import React, { Component } from "react";
import { StyleSheet, CameraRoll, View, PermissionsAndroid } from "react-native";

class GalleryComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            photos: []
        }
    }

    componentDidMount() {
        this.requestCameraPermission()
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getPhotos()
            } else {
                alert("Read gallery permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    getPhotos() {
        CameraRoll.getPhotos({ first: 1000000 }).then(res => {
            let photoArray = res.edges;
            this.setState({
                photos: photoArray
            })
        });
    }

    render() {
        return(
            <View style={{ height: 150, backgroundColor: "red" }} />
        )
    }
}

export default GalleryComponent;