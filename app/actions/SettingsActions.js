export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

export const actionCreators = {
    changeTheme: () => {
        return {
            type: types.CHANGE_THEME,
            payload: {
                app_color: '#F21238',
                status_bar_color: '#BE0F2C',
                toolbar_color: '#D71132',
            }
        }
    }
}