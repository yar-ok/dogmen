import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

import { store } from "../config/store";

class AppButton extends Component {
  getButtonStyle = () => {
    return {
      backgroundColor: store.getState().settingsState.status_bar_color,
      width: 100,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  render() {
    return(
      <View>
        <Button
        onPress={ () => this.props.onPressed() }
        style={ this.getButtonStyle() }>
          <Text style={ styles.buttonText }>{this.props.text}</Text>
        </Button>
      </View>
    )
  }
}

export default AppButton

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
})
