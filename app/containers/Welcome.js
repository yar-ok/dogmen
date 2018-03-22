import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import Resources from '../utils/Resources'

import { NavigationActions } from 'react-navigation';

import StartButtom from '../components/AppButton'

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'

class Welcome extends Component {
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
      <View style={{ flex:1, backgroundColor: Resources.APP_COLOR }}>
        <StatusBar hidden = {false} backgroundColor={Resources.STATUS_BAR_COLOR}/>
        <IndicatorViewPager
        style={{flex:1}}
        indicator={this.renderDotIndicator()}>
          <View style={{backgroundColor:'cadetblue'}} />
          <View style={{backgroundColor:'cornflowerblue'}} />
          <View style={{backgroundColor:'#1AA094'}} />
        </IndicatorViewPager>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
          <StartButtom text='Start' onPressed={() => this.start()}/>
        </View>
      </View>
    )
  }
}

export default Welcome
