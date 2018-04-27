import React, { Component } from "react";
import {
  Text,
  View,
  WebView,
  TouchableOpacity,
  InteractionManager
} from "react-native";

import Resources from '../utils/Resources'
import AppHeaderTitle from "../components/AppHeaderTitle";
import { NavigationActions } from "react-navigation";

import Spinner from "react-native-loading-spinner-overlay";

const WEBVIEW_REF = "WEBVIEW_REF";

class WebViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      canGoBack: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <AppHeaderTitle title="Web" />,
      headerTintColor: "white",
      headerRight: (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", paddingRight: 8 }}
          onPress={() => params.handleBack()}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Back</Text>
        </TouchableOpacity>
      ),      
      headerLeft: (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", paddingLeft: 8 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Close</Text>
        </TouchableOpacity>
      ),      
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR
      }
    };
  };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({ 
                handleBack: this.onBack 
            });
        });
    }

  updateLoadingState(loading) {
    this.setState({
      isLoading: loading
    });
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  onBack = () => {
    if(this.state.canGoBack) {
        this.refs[WEBVIEW_REF].goBack();
    } else {
        this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Resources.APP_COLOR }}>
        <WebView
          ref={WEBVIEW_REF}
          source={{ uri: "https://github.com/facebook/react-native" }}
          style={{ flex: 1, backgroundColor: Resources.APP_COLOR }}
          onLoadStart={() => this.updateLoadingState(true)}
          onLoadEnd={() => this.updateLoadingState(false)}
          onNavigationStateChange={this.onNavigationStateChange}
        />

        <Spinner visible={this.state.isLoading} />
      </View>
    );
  }
}

export default WebViewScreen;