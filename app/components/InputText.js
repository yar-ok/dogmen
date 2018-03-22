import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

class InputText extends Component {
  render() {
    return(
      <TextInput style={styles.textInput}
        placeholder={this.props.placeholder}
        underlineColorAndroid='transparent'
        multiline={false}
        maxLength = {40}
        selectionColor={'white'}
        textAlign={'center'}
        returnKeyType={'done'}
        onChangeText={(text) => this.props.textChanged === undefined ? console.log(text) : this.props.textChanged(text)}/>
    )
  }
}

export default InputText

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    color: 'white',
  }
})
