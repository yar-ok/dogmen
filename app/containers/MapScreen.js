import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

import AppHeaderTitle from "../components/AppHeaderTitle";
import Resources from "../utils/Resources";

import MapView from "react-native-maps";

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [
                {
                    coordinate: {
                        latitude: 49.437710,
                        longitude: 32.085894,
                    },
                },
                {
                    coordinate: {
                        latitude: 49.445641,
                        longitude: 32.092245,           
                    },
                },
                {
                    coordinate: {
                        latitude: 49.449239, 
                        longitude: 32.068127,           
                    },
                },
                {
                    coordinate: {
                        latitude: 49.420246, 
                        longitude: 32.058142,           
                    },
                }
            ],
            myLocation: {
                latitude: 49.408073, 
                longitude: 32.044204,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068
            }
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

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    myLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.04864195044303443,
                        longitudeDelta: 0.040142817690068
                    } 
                });
            },
            (error) => alert('Location error -> ' + error.message),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    render() {
        return(
            <View>
                <MapView style={ styles.container } 
                showsUserLocation={true}
                region={this.state.myLocation}
                initialRegion={{ 
                    latitude: this.state.myLocation.latitude, 
                    longitude: this.state.myLocation.longitude, 
                    latitudeDelta: this.state.myLocation.latitudeDelta, 
                    longitudeDelta: this.state.myLocation.longitudeDelta 
                }} 
                
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  }
});
                // region={{ latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: this.state.latitudeDelta, longitudeDelta: this.state.longitudeDelta }}

export default MapScreen