import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { persistCombineReducers } from "redux-persist";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import appReducer from "../reducers/AppReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["token"]
};

const persistAppReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistAppReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
