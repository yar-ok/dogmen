import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import Styles from '../utils/App.style'
import InputText from '../components/InputText'
import Resources from '../utils/Resources'
import Spinner from 'react-native-loading-spinner-overlay'
import { actionCreators } from '../actions/LoginActions'
import Utils from '../utils/Utils'

import SendButton from '../components/AppButton'

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  loading: state.loading,
  error: state.error,
  result: state.result,
});

const mapDispatchToProps = (dispatch) => {
  return {
      sendEmail: (email) => { dispatch(actionCreators.resetPassword(email)) },
      resetLogin: () => { dispatch(actionCreators.resetLogin()) },
  }
}

class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
    };
  }

  emailChanged = (text) => {
    this.setState({
      email: text,
    })
  }

  send = () => {
    if (this.state.email.trim() === '') {
      Utils.showAlert('Email can not be empty', null)
    } else {
      this.props.sendEmail(this.state.email)
    }
  }

  onErrorDialogClicked = () => {
    this.props.resetLogin()
  }

  render() {
    if (!this.props.loading && !this.props.error && this.props.result) {
      setTimeout (() => {
          this.props.navigation.goBack()
      }, 200)
    }

    if (this.props.error) {
      Utils.showAlert('Login failed', this.onErrorDialogClicked)
    }

    return(
      <View style={ Styles.backgroundContainer }>
        <Text style={ styles.title }>Forgot password</Text>
        <InputText placeholder='Enter your email' textChanged={(text) => this.emailChanged(text) } />
        <SendButton onPressed={() => this.send()} text='Send' />
        <Spinner visible={this.props.loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    marginBottom: 50,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  button: {
    backgroundColor: Resources.STATUS_BAR_COLOR,
    width: 100,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
