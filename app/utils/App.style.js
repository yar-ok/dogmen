import React, { Component } from "react";
import {
  View,
} from "react-native";

import { store } from "../config/store";

class BackgroundContainer extends Component {
  containerStyle = () => {
    return {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: store.getState().settingsState.app_color,
    }
  }

  render() {
    return(
      <View style={ this.containerStyle() }>
        { this.props.children }
      </View>
    )
  }
}

export default BackgroundContainer

// export default {
//   backgroundContainer: {
//       flex: 1,
//       width: null,
//       height: null,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: getBackgroundColor(),
//   },
// }

// function getBackgroundColor() {
//   alert('CHECK')
//   return store.getState().settingsState.app_color
// }
