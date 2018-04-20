import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated
} from "react-native";
import Resources from '../utils/Resources'
import { NavigationActions } from 'react-navigation';
import Styles from '../utils/App.style'
import DatabaseSettings from '../utils/DatabaseSettings'
import Constants from '../utils/Constants'

import ProgressView from '../components/ProgressView'

import { store, persistor } from '../config/store'

const { width } = Dimensions.get("window");

class SplashContainer extends Component {
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(0);
    this.state = {
      progress: 0
    };
  }
  static navigationOptions = {
    header : null
  };

  goNextScreen = (token) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: token !== undefined && token !== '' && token !== null ? 'Dashboard' : 'Login'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentDidMount() {
        DatabaseSettings.initDatabase();

        this.progress.setValue(0);
        this.progress.addListener((progress) => {
            this.setState({
                progress: parseInt(progress.value) + '%'
            });
        });
    
        Animated.timing(this.progress, {
            duration: 7000,
            toValue: 100
        }).start(() => {
          setTimeout(() => {
            const { token } = store.getState().loginState;
            this.goNextScreen(token);         
          }, 500)
        });
  }

  render() {  
    // setTimeout (() => {
      // const { token } = store.getState().loginState;
      // this.goNextScreen(token);
    // }, 4000);
    return (
      <View style={Styles.backgroundContainer}>
        <StatusBar hidden = {true}/>
        <View style={styles.logocontainer}>
          <Image source={require('../images/splash_image.png')} style={styles.logo}/>
          <Text style={styles.title}>Dogmen</Text>
         <View style={{ height: 46, width: width }}>
          <ProgressView progress={this.state.progress} progressAnim={this.progress} />
        </View>
        <Text style={styles.progress_status}>
          { this.state.progress }
        </Text>
       </View>
      </View>
    )

  }
}

export default SplashContainer

const styles = StyleSheet.create({
  logocontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain"
  },

  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#ffffff"
  },
  progress_status: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
