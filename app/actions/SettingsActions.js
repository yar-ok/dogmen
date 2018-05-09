export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

import { BROWN_THEME, RED_THEME, GREEN_THEME } from '../utils/Constants'
import ThemeUtils from "../utils/ThemeUtils";

export const actionCreators = {
    changeTheme: (theme) => {
        switch(theme) {
            case BROWN_THEME:
                return {
                    type: types.CHANGE_THEME,
                    payload: ThemeUtils.getBrownTheme()
                }
            
            case RED_THEME:
                return {
                    type: types.CHANGE_THEME,
                    payload: ThemeUtils.getRedTheme()
                }

            case GREEN_THEME:
                return {
                    type: types.CHANGE_THEME,
                    payload: ThemeUtils.getGreenTheme()
                }

        }
    }
}