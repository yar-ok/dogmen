import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import InputText from '../components/InputText'
import Styles from '../utils/App.style'
import Resources from '../utils/Resources'
import SignUpButton from '../components/AppButton'
import AndroidImagePicker from '../modules/AndroidImagePicker'

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux'
import { actionCreators } from '../actions/LoginActions'
import Spinner from 'react-native-loading-spinner-overlay'

import Utils from '../utils/Utils'

const NAME = 'Name'
const LASTNAME = 'Lastname'
const EMAIL = 'Email'
const AGE = 'Age'

const mapStateToProps = (state) => ({
  loading: state.loading,
  token: state.token,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
      onSignUp: (name, lastName, email, age) => { dispatch(actionCreators.signUp(name, lastName, email, age)) },
      resetSignUp: () => { dispatch(actionCreators.resetSignUp()) },
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      age: '',
    };
  }

  signUp = () => {
    if (this.state.name.trim() === '') {
      Utils.showAlert('Name can not be empty', null)
    } else if(this.state.lastName.trim() === '') {
      Utils.showAlert('Lastname can not be empty', null)
    } else if(this.state.email.trim() === '') {
      Utils.showAlert('Email can not be empty', null)
    } else if(this.state.age.trim() === '') {
      Utils.showAlert('Age can not be empty', null)
    } else {
      this.props.onSignUp(
        this.state.name, this.state.lastName, this.state.email, this.state.age
      )
    }
  }

  updateEnteredData = (fieldName, text) => {
    switch (fieldName) {
      case NAME:
        this.setState({
          name: text,
        })
        break;
      case LASTNAME:
        this.setState({
          lastName: text,
        })
        break;
      case EMAIL:
        this.setState({
          email: text,
        })
        break;
      case AGE:
        this.setState({
          age: text,
        })
        break;
    }
  }

  onAddImageClicked = () => {
    if (Platform.OS === 'android') {
      AndroidImagePicker.pickImage(
        {},
        (uri) => { console.log(uri) },
        (error) => { console.log(error) }
      )
    }
  }

  onErrorDialogClicked = () => {
    this.props.resetSignUp()
  }

  render() {
    if (this.props.error) {
      Utils.showAlert('Sign up failed', this.onErrorDialogClicked)
    }

    setTimeout (() => {
        if (!this.props.error && this.props.token !== undefined && this.props.token.trim() !== "") {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'Welcome'
              })
            ]
          })
          this.props.navigation.dispatch(resetAction)
        }
    }, 200)

    return(
      <View style={ Styles.backgroundContainer }>
        <StatusBar hidden = {false} backgroundColor={Resources.STATUS_BAR_COLOR}/>
        <Text style={ styles.title }>Sign up</Text>

        <TouchableOpacity style={styles.imageContainer} onPress={() => this.onAddImageClicked()}>
          <Image source={require('../images/splash_image.png')} style={styles.userImage} />
        </TouchableOpacity>
        <InputText placeholder={NAME} textChanged={(text) => this.updateEnteredData(NAME, text)}/>
        <View style={styles.view} />

        <InputText placeholder={LASTNAME} textChanged={(text) => this.updateEnteredData(LASTNAME, text)}/>
        <View style={styles.view} />

        <InputText placeholder={EMAIL} textChanged={(text) => this.updateEnteredData(EMAIL, text)}/>
        <View style={styles.view} />

        <InputText placeholder={AGE} textChanged={(text) => this.updateEnteredData(AGE, text)}/>
        <View style={styles.view} />

        <SignUpButton onPressed={() => this.signUp()} text='Send' />
        <Spinner visible={this.props.loading} />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  view: {
    marginBottom: 10,
  },

  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  userImage: {
    height: 144,
    width: 144,
    borderRadius: 72,
  },

})
