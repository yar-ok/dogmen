import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';

import PushNotification from '../utils/PushNotification'
import Resources from '../utils/Resources'
import Styles from '../utils/App.style'

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: 'white'}}>Dogmen</Text>
        </View>
      ),
      headerTintColor: 'white',
      headerRight: <View/>,
      headerLeft: (
        <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 8}}
        onPress={ () => params.handleLogout() }>
          <Text style={{fontSize: 16, color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR,
      },
    }
  };

  componentDidMount () {
    this.props.navigation.setParams({ handleLogout: this.logout })
  }

  logout = () => {
    alert('Back')
  }

  render() {
    return(
      <View style={Styles.backgroundContainer}>
        <PushNotification />
        <StatusBar hidden = {false} backgroundColor={Resources.STATUS_BAR_COLOR}/>
        <Text>Dashboard screen</Text>
      </View>
    )
  }
}

export default Dashboard
