import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Container from '../utils/App.style'

import { connect } from 'react-redux'
import { actionCreators } from '../actions/LoginActions'
import Utils from '../utils/Utils'
import LoginButton from '../components/AppButton'

import InputText from '../components/InputText'
import Spinner from 'react-native-loading-spinner-overlay'

import { NavigationActions } from 'react-navigation';

import { store } from "../config/store";

const mapStateToProps = (state) => ({
  loading: state.loginState.loading,
  token: state.loginState.token,
  error: state.loginState.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: (username, password) => { dispatch(actionCreators.login(username, password)) },
      resetLogin: () => { dispatch(actionCreators.resetLogin()) }
  }
}

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  static navigationOptions = {
    header : null
  };

  login = () => {
    if (this.state.login.trim() === '') {
      Utils.showAlert('Username can not be empty', null)
    } else if (this.state.password.trim() === '') {
      Utils.showAlert('Password can not be empty', null)
    } else {
      this.props.onLogin(this.state.login, this.state.password)
    }
  }

  updateLogin = (text) => {
    this.setState({
      login:text
    })
  }

  updatePassword = (text) => {
    this.setState({
      password:text
    })
  }

  onErrorDialogClicked = () => {
    this.props.resetLogin()
  }

  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword')
  }

  signUp = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'SignUp'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    if (this.props.error) {
      Utils.showAlert('Login failed', this.onErrorDialogClicked)
    }

    setTimeout (() => {
        if (!this.props.error && this.props.token !== undefined && this.props.token !== "") {
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
    }, 200)

    return <Container>
      <StatusBar hidden={false} backgroundColor={store.getState().settingsState.status_bar_color} />
        <Text style={styles.title}>Login</Text>
        <InputText placeholder="Enter your login" textChanged={text => this.updateLogin(text)} />
        <View style={{ height: 10 }} />
        <InputText placeholder="Enter password" textChanged={text => this.updatePassword(text)} />
        <LoginButton onPressed={() => this.login()} text="Log in" />
        <TouchableOpacity style={{ padding: 8 }} onPress={() => this.forgotPassword()}>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 8 }} onPress={() => this.signUp()}>
          <Text style={styles.forgotPassword}>Sign up</Text>
        </TouchableOpacity>
        <Spinner visible={this.props.loading} />
      </Container>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  forgotPassword: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
})
