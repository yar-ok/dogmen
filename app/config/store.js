import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers/AppReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['token'],
};

const persistAppReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = createStore(persistAppReducer, applyMiddleware(thunk));

// export const store = createStore(
//   persistAppReducer, 
//   {}, 
//   compose(
//     autoRehydrate(), 
//     applyMiddleware(thunk)
//   ));

// export const store = compose(
//   autoRehydrate()
// )(createStore)(persistAppReducer);

export const persistor = persistStore(store);
