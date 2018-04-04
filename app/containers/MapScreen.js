import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

import MapView from "react-native-maps";

class MapScreen extends Component {
    render() {
        return <View>
            <MapView style={ styles.container } region={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.015, longitudeDelta: 0.0121 }} />
          </View>;
    }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  }
});

export default MapScreen