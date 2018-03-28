import React, { Component } from 'react';
import { StyleSheet, Picker, Text, TouchableOpacity } from 'react-native';

class AppPicker extends Component {
    render() {
      return(
        <Picker
          mode='dropdown'
          selectedValue={this.props.selectedWalker}
          onValueChange={(itemValue, itemIndex) => this.props.selectedWalkerChanged(itemIndex)}>
            {this.props.walkers.map((item, index) => {
              return (<Picker.Item label={item.name} value={index} key={index}/>)
            })}
        </Picker>
      )
    }
}

export default AppPicker
