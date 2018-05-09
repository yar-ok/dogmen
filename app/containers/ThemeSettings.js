import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TouchableOpacity
} from "react-native";

import { actionCreators } from '../actions/SettingsActions'
import { connect } from 'react-redux'
import { BROWN_THEME, RED_THEME, GREEN_THEME, BROWN, RED, GREEN } from '../utils/Constants'

import ThemeUtils from '../utils/ThemeUtils'

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
    constructor(props) {
        super(props);
        this.state = {
            selectedTheme: store.getState().settingsState.current_theme,
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <AppHeaderTitle title="Theme Settings" />,
            headerTintColor: "white",
            headerRight: <View />,
            headerStyle: {
                backgroundColor: this.getButtonColor()
            }
        };
    };

    getButtonStyle = () => {
        return {
            marginLeft: 60,
            marginRight: 60,
            marginTop: 10,
            backgroundColor: this.getButtonColor(),
            alignItems: 'center',
            borderRadius: 6,
        }
    }

    getButtonColor = () => {
        switch (this.state.selectedTheme) {
          case BROWN_THEME:
            return ThemeUtils.getBrownTheme().status_bar_color;
          case RED_THEME:
            return ThemeUtils.getRedTheme().status_bar_color;
          case GREEN_THEME:
            return ThemeUtils.getGreenTheme().status_bar_color;
        }
    }

    changeTheme = () => {
        // this.props.changeTheme(GREEN_THEME)
    }

    showSelectedTheme = (theme) => {
        if (theme !== this.state.selectedTheme) {
            this.setState({
                selectedTheme: theme
            })
        }
    }

    getStatusbarColor = () => {
        switch (this.state.selectedTheme) {
            case BROWN_THEME:
                return ThemeUtils.getBrownTheme().status_bar_color;
            case RED_THEME:
                return ThemeUtils.getRedTheme().status_bar_color;
            case GREEN_THEME:
                return ThemeUtils.getGreenTheme().status_bar_color;
        }
    }

    render() {
        return(
            <View>
                <StatusBar
                    hidden={false}
                    backgroundColor={this.getStatusbarColor()}
                />
                <View style={ styles.colorsListContainer }>
                    <TouchableOpacity activeOpacity={0.9} style={styles.brownItem } onPress={() => this.showSelectedTheme(BROWN_THEME)}/>
                    <TouchableOpacity activeOpacity={0.9} style={styles.redItem} onPress={() => this.showSelectedTheme(RED_THEME)}/>
                    <TouchableOpacity activeOpacity={0.9} style={styles.greenItem} onPress={() => this.showSelectedTheme(GREEN_THEME)}/>
                </View>

                <TouchableOpacity
                style={this.getButtonStyle()}
                activeOpacity={0.9}
                onPress={() => this.changeTheme()}>
                    <Text style={{ color: 'white', padding: 8, fontSize: 16 }}>Save theme</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSettings)

const ITEM_SIZE = 40
const BORDER_RADIUS = 4

const styles = StyleSheet.create({
    colorsListContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 4,
        marginBottom: 6
    },

    brownItem: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        backgroundColor: BROWN,
        borderRadius: BORDER_RADIUS,
    },

    redItem: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        backgroundColor: RED,
        borderRadius: BORDER_RADIUS,
    },

    greenItem: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        backgroundColor: GREEN,
        borderRadius: BORDER_RADIUS,
    },

})