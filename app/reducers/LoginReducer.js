import { types } from '../actions/LoginActions';
import { REHYDRATE } from "redux-persist";

const initialState = {
  payload: {
    loading: false,
    token: '',
    error: false,
    result: false,
  }
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  // alert('Login: type -> ' + type)

  switch (type) {
    case REHYDRATE:
      // alert("Token: " + payload.token);
      return { ...state, persistedState: payload };

    case types.LOGIN_USER:
      return { ...state, loading: payload.loading, error: payload.error, token: payload.token };

    case types.FORGOT_PASSWORD:
      return { ...state, loading: payload.loading, error: payload.error, result: payload.result };

    case types.SIGN_UP:
      return { ...state, loading: payload.loading, error: payload.error, token: payload.token };

    case types.LOGOUT:
      return { ...state, loading: payload.loading, error: payload.error, token: payload.token };
  }

  return state;
}

export default reducer
