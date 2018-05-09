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

import AppHeaderTitle from "../components/AppHeaderTitle";
import { store } from "../config/store";

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
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <AppHeaderTitle title="Theme Settings" />,
            headerTintColor: "white",
            headerRight: <View />,
            headerStyle: {
                backgroundColor: store.getState().settingsState.toolbar_color
            }
        };
    };

    render() {
        return(
            <View>
                <Button
                title="Click"
                onPress={() => this.props.changeTheme(Constants.GREEN_THEME)} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)