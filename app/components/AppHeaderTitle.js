import React, { Component } from 'react';
import { Text, View } from 'react-native';

class AppHeaderTitle extends Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center', flexDirection: 'row'}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          {this.props.title !== undefined ? this.props.title : 'Dogmen'}
        </Text>
      </View>
    )
  }
}

export default AppHeaderTitle
