import React, { Component } from 'react';
import { Text, View } from 'react-native';

import AppHeaderTitle from '../components/AppHeaderTitle'

import Resources from '../utils/Resources'

class PendingOrders extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <AppHeaderTitle title='Pending Orders'/>
      ),
      headerTintColor: 'white',
      headerRight: <View/>,
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR,
      },
    }
  };

  render() {
    return(
      <Text>Pending</Text>
    )
  }
}

export default PendingOrders
