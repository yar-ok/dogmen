import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";

import { actionCreators } from '../actions/SettingsActions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    // loading: state.loginState.loading,
    // token: state.loginState.token,
    // error: state.loginState.error,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeTheme: () => { dispatch(actionCreators.changeTheme()) },
    }
}

class ThemeSettings extends Component {
    render() {
        return(
            <View>
                <Button
                title="Click"
                onPress={() => this.props.changeTheme()} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)