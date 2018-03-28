import { types } from '../actions/OrderActions';

const initialState = {
  orders: [],
  walkers: [],
  pets: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  const { type, orders, walkers, pets } = action;
  switch(type) {
    case types.ALL_ORDERS:
      return {
        ...state,
        orders: orders,
      }

    case types.ALL_WALKERS:
      return {
        ...state,
        walkers: walkers,
      }

    case types.FREE_PETS:
      return {
        ...state,
        pets: pets,
      }

  }

  return state;
}

export default reducer
