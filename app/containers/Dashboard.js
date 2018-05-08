import React, { Component } from 'react';
import {
  Platform,
  Alert,
  DatePickerAndroid,
  DatePickerIOS,
  Modal,
  InteractionManager,
  AsyncStorage,
  StatusBar,
  Text,
  View,
  ScrollView, 
  TouchableOpacity
} from "react-native";

import PushNotification from '../utils/PushNotification'
import Resources from '../utils/Resources'
import Constants from '../utils/Constants'
import Styles from '../utils/App.style'

import ScalingButton from "../components/ScalingButton";
import AppHeaderTitle from '../components/AppHeaderTitle'
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux'
import { actionCreators } from '../actions/LoginActions'

import { store } from "../config/store";

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
      today: new Date()
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
        backgroundColor: store.getState().settingsState.toolbar_color
      }
    };
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({ handleLogout: this.askLogoutConfirm });
    });
  }

  askLogoutConfirm = () => {
    Alert.alert(
      "Dogmen",
      "Do you want to exit?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.logout() }
      ],
      { cancelable: true }
    );
  };

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

  settings = () => {
    this.props.navigation.navigate("Settings");
  };

  webView = () => {
    this.props.navigation.navigate("WebView");
  };

  setupTheme = () => {
    this.props.navigation.navigate("Theme");
  };

  goToHorizontalSwipeItems = () => {
    this.props.navigation.navigate("SwipeItems");
  };

  showCalendar = () => {
    if (Platform.OS === "ios") {
      this.setState({
        showIosCalendar: true
      });
    } else {
      this.showAndroidCalendar();
    }
  };

  closeIosCalendar = () => {
    this.setState({
      showIosCalendar: false
    });
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

  updateSelectedDate = newDate => {
    this.setState({
      today: newDate
    });
  };

  goToMapScreen = () => {
    this.props.navigation.navigate("Map");
  };

  goToAddLocationScreen = () => {
    this.props.navigation.navigate("AddLocation");
  };

  goChatScreen = () => {
    this.props.navigation.navigate("Chat");
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: store.getState().settingsState.app_color }}>
        <View style={Styles.backgroundContainer}>
          <PushNotification />
          <StatusBar
            hidden={false}
            backgroundColor={store.getState().settingsState.status_bar_color}
          />
          <ScalingButton
            position={0}
            text="Pending orders"
            onPressed={() => this.showPendingOrders()}
          />
          <ScalingButton
            position={1}
            text="Calendar"
            onPressed={() => this.showCalendar()}
          />
          <ScalingButton
            position={2}
            text="Horizontal swipe items"
            onPressed={() => this.goToHorizontalSwipeItems()}
          />
          <ScalingButton
            position={3}
            text="Map"
            onPressed={() => this.goToMapScreen()}
          />
          <ScalingButton
            position={4}
            text="Add location"
            onPressed={() => this.goToAddLocationScreen()}
          />
          <ScalingButton
            position={5}
            text="Chat screen"
            onPressed={() => this.goChatScreen()}
          />
          <ScalingButton
            position={6}
            text="Settings"
            onPressed={() => this.settings()}
          />
          <ScalingButton
            position={7}
            text="Web"
            onPressed={() => this.webView()}
          />
          <ScalingButton
            position={8}
            text="Application theme"
            onPressed={() => this.setupTheme()}
          />
          <Modal
            transparent={true}
            visible={this.state.showIosCalendar}
            animationType={"fade"}
            onRequestClose={() => this.closeIosCalendar()}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.closeIosCalendar()}
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "rgba(19, 19, 19, 0.8)"
              }}
            >
              <DatePickerIOS
                date={this.state.today}
                onDateChange={this.updateSelectedDate}
              />
            </TouchableOpacity>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
