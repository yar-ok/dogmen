import { store } from "../config/store";

export default {
  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: getBackgroundColor(),
  },
}

function getBackgroundColor() {
  alert('CHECK')
  return store.getState().settingsState.app_color
}
