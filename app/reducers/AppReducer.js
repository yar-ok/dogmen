import { combineReducers } from 'redux'

import ApiReducer from "./ApiReducer";
import LoginReducer from './LoginReducer'
import OrdersReducer from './OrdersReducer'

const AppReducer = combineReducers({
  apiState: ApiReducer,
  loginState: LoginReducer,
  ordersState: OrdersReducer,
})

export default AppReducer
