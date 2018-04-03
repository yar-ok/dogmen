import { types } from "../actions/ApiActions";

const initialState = {
  payload: {
    loading: false,
    error: false,
    result: undefined
  }
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case types.GET_USERS:
        return { ...state, loading: payload.loading, error: payload.error, users: payload.result }
  }

  return state;
}

export default reducer