import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";

import { actionCreators } from '../actions/SettingsActions'
import { connect } from 'react-redux'
import Constants from '../utils/Constants'

const mapStateToProps = (state) => ({
    // loading: state.loginState.loading,
    // token: state.loginState.token,
    // error: state.loginState.error,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeTheme: (theme) => { dispatch(actionCreators.changeTheme(theme)) },
    }
}

class ThemeSettings extends Component {
    render() {
        return(
            <View>
                <Button
                title="Click"
                onPress={() => this.props.changeTheme(Constants.RED_THEME)} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)