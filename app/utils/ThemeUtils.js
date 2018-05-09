import { BROWN_THEME, RED_THEME, GREEN_THEME, BROWN, RED, GREEN } from './Constants'

const ThemeUtils = {
    getBrownTheme() {
        return {
            app_color: BROWN,
            status_bar_color: '#93784A',
            toolbar_color: '#AB8C57',
            current_theme: BROWN_THEME,
        }
    },

    getRedTheme() {
        return {
            app_color: RED,
            status_bar_color: '#BE0F2C',
            toolbar_color: '#D71132',
            current_theme: RED_THEME,
        }
    },

    getGreenTheme() {
        return {
            app_color: GREEN,
            status_bar_color: '#035309',
            toolbar_color: '#04610A',
            current_theme: GREEN_THEME,
        }
    }
}

export default ThemeUtils