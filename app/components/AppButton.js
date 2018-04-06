import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Resources from '../utils/Resources'

class AppButton extends Component {
  render() {
    return(
      <View>
        <Button
        onPress={ () => this.props.onPressed() }
        style={ styles.button }>
          <Text style={ styles.buttonText }>{this.props.text}</Text>
        </Button>
      </View>
    )
  }
}

export default AppButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: Resources.STATUS_BAR_COLOR,
    width: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
})
