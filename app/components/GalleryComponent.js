import React, { Component } from "react";
import {
  StyleSheet,
  CameraRoll,
  View,
  PermissionsAndroid,
  FlatList,
  Platform
} from "react-native";

import Permissions from 'react-native-permissions'
import GalleryItem from "./GalleryItem"

class GalleryComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            photos: []
        }
    }

    componentDidMount() {
      this.checkPermission()
    }

    checkPermission() {
      if (Platform.OS === 'android') {
        this.requestCameraPermission()
      } else {
        Permissions.check('photo').then(response => {
           if (response === 'undetermined' || response === 'denied') {
             Permissions.request('photo').then(response => {
                if (response === 'allow' || response === 'authorized') {
                  this.getPhotos()
                } else {
                  alert('Permission denied')
                  this.props.onError()
                }
              })
           } else {
             this.getPhotos()
           }
        })
      }
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
            <View style={{ height: this.state.photos.length > 0 ? 200 : 0 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.photos}
                    numColumns={3}
                    keyExtractor={item => item.node.image.uri}
                    renderItem={({item}) => <GalleryItem {...item} onSelected={this.props.onSelected}/>}
                />
            </View>
        )
    }
}

export default GalleryComponent;
