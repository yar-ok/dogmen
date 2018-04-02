import { AsyncStorage } from 'react-native';
import Constants from '../utils/Constants'

export const types = {
  LOGIN_USER: 'LOGIN_USER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  SIGN_UP: 'SIGN_UP',
  LOGOUT: 'LOGOUT',
}

export const actionCreators = {
  login: (userName, pass) => async(dispatch, getState) => {
    dispatch({
      type: types.LOGIN_USER,
      payload: {
        loading: true,
        error: false
      }
    });
    setTimeout (() => {
      // check for server error
      if (true) {
        let token = 'j23hDDSjkKLfbj6dsgzdgm56sJPdflgn'
        saveUserData(token)
        dispatch({
          type: types.LOGIN_USER,
          payload: {
            loading: false,
            error: false,
            token: token
          }
        });
      } else {
        //error
        dispatch({
          type: types.LOGIN_USER,
          payload: {
            loading: false,
            error: true
          }
        });
      }
    }, 4000)
  },

  resetLogin: () => {
    return {
      type: types.LOGIN_USER,
      payload: {
        loading: false,
        token: '',
        error: false,
      }
    }
  },

  resetPassword: (email) => async(dispatch, getState) => {
    dispatch({
      type: types.FORGOT_PASSWORD,
      payload: {
        loading: true,
        error: false,
        result: false,
      }
    })

    setTimeout (() => {
      // check for server error
      if (true) {
        dispatch({
          type: types.FORGOT_PASSWORD,
          payload: {
            loading: false,
            error: false,
            result: true,
          }
        })
      } else {
        //error
        dispatch({
          type: types.FORGOT_PASSWORD,
          payload: {
            loading: false,
            error: true,
            result: false,
          }
        })
      }
    }, 3000)
  },

  signUp: (name, lastName, email, age) => async(dispatch, getState) => {
    dispatch({
      type: types.SIGN_UP,
      payload: {
        loading: true,
        error: false,
      }
    })
    setTimeout (() => {
      // check for server error
      if (true) {
        let token = 'j23hDDSjkKLfbj6dsgzdgm56sJPdflgn'
        saveUserData(token)
        dispatch({
          type: types.SIGN_UP,
          payload: {
            loading: false,
            error: false,
            token: token,
          }
        })
      } else {
        //error
        dispatch({
          type: types.SIGN_UP,
          payload: {
            loading: false,
            error: true,
          }
        })
      }
    }, 4000)
  },

  resetSignUp: () => {
    return {
      type: types.SIGN_UP,
      payload: {
        loading: false,
        token: '',
        error: false,
      }
    }
  },

  logout: () => {
    logout()
    return {
      type: types.LOGOUT,
      payload: {
        loading: false,
        token: '',
        error: false,
      }
    }
  },
}

function logout() {
  AsyncStorage.multiSet(
    [
      [Constants.USER_TOKEN, ''],
      [Constants.USER_NAME, ''],
    ], function(error) {
          if(error) {
            alert("error!");
          }
      }
  );
}

function saveUserData(token) {
  let name = 'Test Name'
  AsyncStorage.multiSet(
    [
      [Constants.USER_TOKEN, token],
      [Constants.USER_NAME, name],
    ], function(error) {
          if(error) {
            alert("error!");
          }
      }
  );
}
