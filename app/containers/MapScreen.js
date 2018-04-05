import React, { Component } from "react";

import { StyleSheet, View, Text, Dimensions, Animated, Image } from "react-native";

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
                    dogName: 'Jessy',
                    customerName: 'Anna Mary',
                    customerImg: 'https://randomuser.me/api/portraits/thumb/women/82.jpg',
                    time: '11.00'
                },
                {
                    coordinate: {
                        latitude: 49.445641,
                        longitude: 32.092245,
                    },
                    dogName: 'Tom',
                    customerName: 'Jessica',
                    customerImg: 'https://randomuser.me/api/portraits/thumb/women/37.jpg',
                    time: '12.00'
                },
                {
                    coordinate: {
                        latitude: 49.449239,
                        longitude: 32.068127,
                    },
                    dogName: 'Fox',
                    customerName: 'Michael Black',
                    customerImg: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
                    time: '13.00'
                },
                {
                    coordinate: {
                        latitude: 49.420246,
                        longitude: 32.058142,
                    },
                    dogName: 'Tompson',
                    customerName: 'Diana',
                    customerImg: 'https://randomuser.me/api/portraits/thumb/women/15.jpg',
                    time: '14.00'
                },
                {
                    coordinate: {
                        latitude: 49.430009,
                        longitude: 32.084544,
                    },
                    dogName: 'Tyson',
                    customerName: 'Bob Dilan',
                    customerImg: 'https://randomuser.me/api/portraits/thumb/men/30.jpg',
                    time: '15.00'
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
                >
                    {this.state.markers.map((marker, index) => {
                        return <MapView.Marker key={index} coordinate={marker.coordinate}>
                            <Animated.View style={[styles.markerWrap]}>
                              <View style={styles.marker} />
                            </Animated.View>
                            <MapView.Callout tooltip={false}>
                                <View style={{ width: 200 }}>
                                  <View style={{ flexDirection: 'row' }}>
                                      <Image source={{ uri: marker.customerImg }} style={{ height: 70, width: 70, borderRadius: 1, marginRight: 6, alignSelf: 'center' }}/>
                                      <View style={{ justifyContent: "center" }}>
                                          <Text style={styles.title}>Pet:</Text>
                                          <Text style={styles.name}>{marker.dogName}</Text>
                                          <Text style={styles.title}>Customer:</Text>
                                          <Text style={styles.name}>{marker.customerName}</Text>
                                      </View>
                                  </View>
                                  <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                    <Text style={styles.title}>Time:</Text>
                                    <Text style={styles.name}>{marker.time}</Text>
                                  </View>
                                </View>
                            </MapView.Callout>
                          </MapView.Marker>;
                    })}
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },

  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  title: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 14,
      color: 'grey'
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 15,
    color: 'black'
  },
});

export default MapScreen
