import React, { Component } from 'react';
import { Platform, DatePickerAndroid, DatePickerIOS, Modal, InteractionManager, AsyncStorage, StatusBar, Text, View, TouchableOpacity } from 'react-native';

import PushNotification from '../utils/PushNotification'
import Resources from '../utils/Resources'
import Constants from '../utils/Constants'
import Styles from '../utils/App.style'

import AppButton from '../components/AppButton'
import AppHeaderTitle from '../components/AppHeaderTitle'
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux'
import { actionCreators } from '../actions/LoginActions'

const mapStateToProps = (state) => ({
  loading: state.loginState.loading,
  token: state.loginState.token,
  error: state.loginState.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
      logoutAndExit: () => { dispatch(actionCreators.logout()) }
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIosCalendar: false,
      today: new Date(),
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <AppHeaderTitle title="Dashboard" />,
      headerTintColor: "white",
      headerRight: <View />,
      headerLeft: (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", paddingLeft: 8 }}
          onPress={() => params.handleLogout()}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Logout</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR
      }
    };
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({ handleLogout: this.logout });
    });
  }

  logout = () => {
    this.props.logoutAndExit();
    this.makeLogout();
  };

  makeLogout = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Login"
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  showPendingOrders = () => {
    this.props.navigation.navigate("PendingOrders");
  };

  settings = () => {};

  showCalendar = () => {
    if(Platform.OS === 'ios') {
      this.setState({
        showIosCalendar: true
      })
    } else {
      this.showAndroidCalendar()
    }
  };

  closeIosCalendar = () => {
    this.setState({
      showIosCalendar: false
    })
  };

  async showAndroidCalendar() {
   try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }

  }

  updateSelectedDate = (newDate) => {
    this.setState({
      today: newDate
    })
  }

  render() {
    // if (!this.props.error && !this.props.loading && (this.props.token === undefined || this.props.token === null || this.props.token === '')) {
    //   setTimeout (() => {
    //     this.makeLogout()
    //   }, 200)
    // }
    return (
      <View style={Styles.backgroundContainer}>
        <PushNotification />
        <StatusBar
          hidden={false}
          backgroundColor={Resources.STATUS_BAR_COLOR}
        />
        <AppButton
          text="Pending orders"
          onPressed={() => this.showPendingOrders()}
        />
        <AppButton text="Calendar" onPressed={() => this.showCalendar()} />
        <AppButton text="Settings" onPressed={() => this.settings()} />
        <Modal
            transparent={true}
            visible={this.state.showIosCalendar}
            animationType={'fade'}
            onRequestClose={() => this.closeIosCalendar()}>
            <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.closeIosCalendar()}
            style={{flex:1, justifyContent: 'center', backgroundColor: 'rgba(19, 19, 19, 0.8)'}}>
              <DatePickerIOS
                date={this.state.today}
                onDateChange={this.updateSelectedDate}
                />
          </TouchableOpacity>
        </Modal>

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
