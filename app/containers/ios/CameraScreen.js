import React, { Component } from 'react';
import {
  CameraRoll,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  StatusBar,
} from 'react-native';

import ViewPhotos from '../../components/ios/ViewPhotos';
import Resources from '../../utils/Resources'

class CameraScreen extends Component {
  static navigationOptions = {
    headerTitle: (
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <Text style={{fontSize: 18, color: 'white'}}>Gallery</Text>
      </View>
    ),
    headerTintColor: 'white',
    headerRight: <View/>,
    headerStyle: {
      backgroundColor: Resources.APP_COLOR
    },
  };

  state = {
    photoArray: []
  }

  componentDidMount() {
    this.getPhotosFromGallery()
  }

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1000000 })
      .then(res => {
        let photoArray = res.edges;
        this.setState({ photoArray: photoArray })
      })
  }

  render() {
    return (
      <ViewPhotos
        navigator={this.props.navigation}
        photoArray={this.state.photoArray} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CameraScreen;
