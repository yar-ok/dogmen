import React, { Component } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Resources from '../utils/Resources'
import { NavigationActions } from 'react-navigation';
import Styles from '../utils/App.style'
import DatabaseSettings from '../utils/DatabaseSettings'
import Constants from '../utils/Constants'

import { store } from '../config/store'

class SplashContainer extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header : null
  };

  componentDidMount() {
    DatabaseSettings.initDatabase()
  }

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

  render() {
    setTimeout (() => {
      const { token } = store.getState();
      alert('Token -> ' + token)
      try {
            AsyncStorage.getItem(Constants.USER_TOKEN).then((value) => {
                this.goNextScreen(value);
            }).done();
          } catch (error) {
            alert('Error -> ' + error);
          }
    }, 3000);
    return (
      <View style={Styles.backgroundContainer}>
        <StatusBar hidden = {true}/>
        <View style={styles.logocontainer}>
            <Image source={require('../images/splash_image.png')} style={styles.logo}/>
            <Text style={styles.title}>Dogmen</Text>
          </View>
      </View>
    )

  }
}

export default SplashContainer

const styles = StyleSheet.create({
  logocontainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#ffffff'
  },
});
