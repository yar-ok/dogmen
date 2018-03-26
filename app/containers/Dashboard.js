import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';

import PushNotification from '../utils/PushNotification'
import Resources from '../utils/Resources'
import Styles from '../utils/App.style'

import AppButton from '../components/AppButton'
import AppHeaderTitle from '../components/AppHeaderTitle'

class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <AppHeaderTitle title='Dashboard'/>
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

  showPendingOrders = () => {
    this.props.navigation.navigate('PendingOrders')
  }

  settings = () => {

  }

  render() {
    return(
      <View style={Styles.backgroundContainer}>
        <PushNotification />
        <StatusBar hidden = {false} backgroundColor={Resources.STATUS_BAR_COLOR}/>
        <AppButton text='Pending orders' onPressed={() => this.showPendingOrders()} />
        <AppButton text='Settings' onPressed={() => this.settings()} />
      </View>
    )
  }
}

export default Dashboard
