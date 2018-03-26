import { types } from '../actions/OrderActions';

const initialState = {
  orders: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  const { type, orders } = action;
  switch(type) {
    case types.ALL_ORDERS:
      return {
        ...state,
        orders: orders,
      }
      return
  }

  return state;
}

export default reducer
