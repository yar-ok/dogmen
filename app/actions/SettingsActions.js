export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

import { BROWN_THEME, RED_THEME, GREEN_THEME } from '../utils/Constants'

export const actionCreators = {
    changeTheme: (theme) => {
        switch(theme) {
            case BROWN_THEME:
            alert('Brown')
                return {
                    type: types.CHANGE_THEME,
                    payload: {
                        app_color: '#CCA767',
                        status_bar_color: '#93784A',
                        toolbar_color: '#AB8C57',
                    }
                }
            
            case RED_THEME:
                alert('Red')
                return {
                    type: types.CHANGE_THEME,
                    payload: {
                        app_color: '#F21238',
                        status_bar_color: '#BE0F2C',
                        toolbar_color: '#D71132',
                    }
                }

            case GREEN_THEME:
                alert('Green')
                return {
                    type: types.CHANGE_THEME,
                    payload: {
                        app_color: '#04760C',
                        status_bar_color: '#035309',
                        toolbar_color: '#04610A',
                    }
                }

        }
    }
}