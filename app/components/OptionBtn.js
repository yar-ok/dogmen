import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Camera, Gallery, Contacts } from '../utils/Constants'

class OptionBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        }
    }

    getImageByType() {
        switch(this.props.type) {
            case Camera:
                return <Image style={styles.image} tintColor={this.getTintColor()} source={require('../images/ic_camera.png')} />
            case Gallery:
                return <Image style={styles.image} tintColor={this.getTintColor()} source={require("../images/ic_gallery.png")} />;
            case Contacts:
                return <Image style={styles.image} tintColor={this.getTintColor()} source={require("../images/ic_contacts.png")} />;
        }

        return null
    }

    getTintColor() {
        return this.state.isSelected ? "white" : "grey";
    }

    pressed() {
        this.setState({
            isSelected: !this.state.isSelected
        })
        this.props.onPress()
    }

    render() {
        return(
            <TouchableOpacity style={{ padding: 4 }} onPress={() => this.pressed()}>
                 { this.getImageByType() }
            </TouchableOpacity>
        )
    }
}

export default OptionBtn

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 30
    }
})