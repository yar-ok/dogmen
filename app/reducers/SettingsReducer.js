import { types } from '../actions/SettingsActions';
import { REHYDRATE } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import Resources from '../utils/Resources'

const initialState = {
    app_color: Resources.APP_COLOR,
    status_bar_color: Resources.STATUS_BAR_COLOR,
    toolbar_color: Resources.TOOLBAR_COLOR,
    current_theme: Resources.CURRENT_THEME
}

const persistConfig = {
  key: "theme",
  storage: storage,
  stateReconciler: autoMergeLevel2,
    whitelist: ["app_color", "status_bar_color", "toolbar_color", "current_theme"]
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CHANGE_THEME:
            return { 
                ...state, 
                toolbar_color: payload.toolbar_color, 
                app_color: payload.app_color, 
                status_bar_color: payload.status_bar_color, 
                current_theme: payload.current_theme 
            };
    }

    return state;
}

export default persistReducer(persistConfig, reducer);
