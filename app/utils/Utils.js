import React, { Component } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Utils = {
  showAlert(info, onOKPressed) {
    Alert.alert(
    'Dogmen info',
    info,
    [{
      text: 'OK', onPress: () => onOKPressed === null ? console.log('OK Pressed') : onOKPressed()
    }], {
       cancelable: false
     }
    )
  }
}

export default Utils
