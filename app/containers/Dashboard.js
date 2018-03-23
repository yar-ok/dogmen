import React, { Component } from 'react';
import { Text, View } from 'react-native';

import PushNotification from '../utils/PushNotification'

class Dashboard extends Component {

  render() {
    return(
      <View>
        <PushNotification />
        <Text>Dashboard screen</Text>
      </View>
    )
  }
}

export default Dashboard
