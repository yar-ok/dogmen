import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { MenuProvider } from "react-native-popup-menu";

import Routs from './app/config/routes'

export default class App extends Component {
  render() {
    return( 
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    )
  }
}

export const AppNavigator = StackNavigator(
  Routs
  // Routs, {
  //   headerMode: 'none'
  // }
)
