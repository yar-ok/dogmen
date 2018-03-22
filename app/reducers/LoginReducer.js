import { types } from '../actions/LoginActions';

const initialState = {
  loading: false,
  token: '',
  error: false,
  result: false,
}

const reducer = (state = initialState, action) => {
  const { type, loading, error, token, result } = action;

  switch (type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loading: loading,
        error: error,
        token: token,
      }

    case types.FORGOT_PASSWORD:
      return {
        ...state,
        loading: loading,
        error: error,
        result: result,
      }

    case types.SIGN_UP:
      return {
        ...state,
        loading: loading,
        error: error,
        token: token,
      }
  }

  return state;
}

export default reducer
