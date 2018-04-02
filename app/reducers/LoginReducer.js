import { types } from '../actions/LoginActions';
import { REHYDRATE } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const initialState = {
  payload: {
    loading: false,
    token: '',
    error: false,
    result: false,
  }
}

const persistConfig = {
  key: "login",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["token"]
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REHYDRATE:
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

export default persistReducer(persistConfig, reducer);
