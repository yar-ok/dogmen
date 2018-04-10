import { combineReducers } from 'redux'

import ApiReducer from "./ApiReducer";
import LoginReducer from './LoginReducer'
import OrdersReducer from "./OrdersReducer";
import ChatReducer from "./ChatReducer";

const AppReducer = combineReducers({
  apiState: ApiReducer,
  loginState: LoginReducer,
  ordersState: OrdersReducer,
  chatState: ChatReducer,
});

export default AppReducer
