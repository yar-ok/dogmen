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
import MapView from "react-native-maps";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isSelectedLocation: false,
            selectedLocation: {
                latitude: 49.439862,
                longitude: 32.067456,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068
            },
        }
    }

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

  saveCoordinatesAndExit(coordinates) {
    this.setState({
      isSelectedLocation: true,
      selectedLocation: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      }
    });
  }

  getMarkerView() {
    if(this.state.isSelectedLocation) {
      coordinate = {
        latitude: this.state.selectedLocation.latitude,
        longitude: this.state.selectedLocation.longitude
      }
      return <MapView.Marker key={coordinate.latitude} coordinate={coordinate} />;
    } else {
      return null
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          style={{ flex: 1 }}
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          query={{
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

      <MapView style={{flex: 1}}
                showsUserLocation={true}
                region={this.state.selectedLocation}
                initialRegion={{
                    latitude: this.state.selectedLocation.latitude,
                    longitude: this.state.selectedLocation.longitude,
                    latitudeDelta: this.state.selectedLocation.latitudeDelta,
                    longitudeDelta: this.state.selectedLocation.longitudeDelta
      }}>
        { this.getMarkerView() }  
      </MapView>
      </View>
    );
  }
}

export default AddLocation
