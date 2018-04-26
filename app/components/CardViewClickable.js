import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const HEIGHT = 150
const WIDTH = 300
const MARGIN_TOP = 10
const PRESSED_HEIGHT = HEIGHT - MARGIN_TOP
const FONT_SIZE = 100
const FONT_SIZE_PRESSED = FONT_SIZE - MARGIN_TOP / 2

class CardViewClickable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isPressed: false,
    };
  }

  startTouch() {
      this.setState({
        isPressed: true,
      });
  }

  finishTouch() {
      this.setState({
        isPressed: false,
      });
  }

  getCardStyle() {
    return {
        backgroundColor: "white",
        height: this.state.isPressed ? PRESSED_HEIGHT : HEIGHT,
        width: this.state.isPressed ? WIDTH - 20 : WIDTH,
        alignItems: "center",
        justifyContent: "center",
        marginTop: this.state.isPressed ? MARGIN_TOP * 0.8 : 0,

        // borderWidth: 1,
        borderRadius: 8,
        // borderTopWidth: 0,
        // borderColor: "black",
        shadowColor: "black",
        shadowOffset: { width: 3, height: 8 },
        shadowOpacity: 1.0,
        shadowRadius: 5
    }
  }

  getCardTitle() {
    return {
        textAlign: "center",
        fontSize: this.state.isPressed ? FONT_SIZE_PRESSED : FONT_SIZE,
        color: "#30FAF3",
        fontWeight: "bold",
        textShadowColor: "#E91E63",
        textShadowOffset: { width: 1, height: 4 },
        textShadowRadius: 5
    }
  }

  render() {
    return (
      <View
        elevation={10}
        style={this.getCardStyle()}
        onTouchStart={() => this.startTouch()}
        onTouchEnd={() => this.finishTouch()}
      >
        <Text style={this.getCardTitle()}>{this.state.isPressed ? 'No' : 'Yes'}</Text>
      </View>
    );
  }
}

export default CardViewClickable

const styles = StyleSheet.create({
});
