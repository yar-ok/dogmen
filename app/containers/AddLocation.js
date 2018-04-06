import React, { Component } from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import {
  StyleSheet,
  View,
  Text,
  Image
} from "react-native";

import AppHeaderTitle from "../components/AppHeaderTitle";
import Resources from "../utils/Resources";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

class AddLocation extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <AppHeaderTitle title="Location" />,
      headerTintColor: "white",
      headerRight: <View />,
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR
      }
    };
  };

  saveCoordinatesAndExit(coordinates) {}

  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        returnKeyType={"default"}
        fetchDetails={true}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyA90xwRzF8BSN11MOEH8FrnF6hU3vEkNJY",
          language: "en"
        }}
        onPress={(data, details = null) => {
          coordinates = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
          };
          this.saveCoordinatesAndExit(coordinates);
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={false}
      />
    );
  }
}

export default AddLocation
