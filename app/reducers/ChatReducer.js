import { types } from "../actions/ChatActions";

const initialState = {
  loading: false,
  error: false,
  result: undefined
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ALL_CHAT_MESSAGES:
      return {
        ...state,
        loading: payload.loading,
        error: payload.error,
        messages: payload.result
      };
  }

  return state;
};

export default reducer;