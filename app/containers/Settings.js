import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  CheckBox,
  Slider,
  AppState
} from "react-native";

import Resources from "../utils/Resources";
import AppHeaderTitle from '../components/AppHeaderTitle'
import CardView from '../components/CardViewClickable'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitched: false,
      slider: 5,
      appState: AppState.currentState
    };
  }

  updateSwitch(switched) {
    this.setState({
      isSwitched: switched
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <AppHeaderTitle title="Settings" />,
      headerTintColor: "white",
      headerRight: <View />,
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR
      }
    };
  };

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === "active") {
      console.log("Active");
    } else if (nextAppState === "background") {
      console.log("Background");
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Setting:</Text>
        <View style={{ alignSelf: "center" }}>
          <CardView />
        </View>

        <View style={{ marginTop: 10, alignSelf: "center" }}>
          <CheckBox
            style={{ alignSelf: "center", margin: 10 }}
            value={this.state.isSwitched}
            onValueChange={value => this.updateSwitch(value)}
          />
          <Switch
            style={{ alignSelf: "center", margin: 10 }}
            value={this.state.isSwitched}
            onValueChange={value => this.updateSwitch(value)}
          />

          <View
            style={{
              marginTop: 10,
              alignSelf: "center",
              padding: 5,
              borderRadius: 5,
              backgroundColor: "#c6c5c5"
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {this.state.slider}
            </Text>
            <Slider
              style={{ width: 200 }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={this.state.slider}
              onValueChange={value => this.setState({ slider: value })}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    // backgroundColor: Resources.APP_COLOR
  },
  title: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
    margin: 5
  },
 });

export default Settings
