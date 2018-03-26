import { combineReducers } from 'redux'

import LoginReducer from './LoginReducer'
import OrdersReducer from './OrdersReducer'

const AppReducer = combineReducers({
  loginState: LoginReducer,
  ordersState: OrdersReducer,
})

export default AppReducer
