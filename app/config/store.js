import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { persistCombineReducers } from "redux-persist";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import appReducer from "../reducers/AppReducer";
import LoginReducer from "../reducers/LoginReducer";
import OrdersReducer from "../reducers/OrdersReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["token"]
};

// const persistAppReducer = persistCombineReducers(persistConfig, {
//   loginState: LoginReducer,
//   ordersState: OrdersReducer
// });

// const persistAppReducer = persistCombineReducers(persistConfig, appReducer);
const persistAppReducer = persistReducer(persistConfig, appReducer);

// const rootReducer = persistCombineReducers(
//   persistConfig,
//   {
//     loginState: LoginReducer,
//     ordersState: OrdersReducer
//   }
// );

export const store = createStore(persistAppReducer, applyMiddleware(thunk));

// export const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));

// export const store = compose(
//   autoRehydrate()
// )(createStore)(persistAppReducer);

export const persistor = persistStore(store);
