import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { NavigationActions } from 'react-navigation';

import StartButton from '../components/AppButton'

import { store } from "../config/store";

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'

class Welcome extends Component {
  static navigationOptions = {
    header : null
  };

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  start = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Dashboard'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return(
      <View style={{ flex: 1, backgroundColor: store.getState().settingsState.app_color }}>
        <StatusBar hidden={false} backgroundColor={store.getState().settingsState.status_bar_color}/>
        <IndicatorViewPager
        style={{flex:1}}
        indicator={this.renderDotIndicator()}>
          <View style={{backgroundColor:'cadetblue'}} />
          <View style={{backgroundColor:'cornflowerblue'}} />
          <View style={{backgroundColor:'#1AA094'}} />
        </IndicatorViewPager>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
          <StartButton text='Start' onPressed={() => this.start()}/>
        </View>
      </View>
    )
  }
}

export default Welcome
