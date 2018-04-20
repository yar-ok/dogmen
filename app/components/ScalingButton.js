import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from "react-native";
import { Button } from "native-base";
import Resources from "../utils/Resources";

const ScalingButton = props => {
  let scaleValue = new Animated.Value(0);

  const DURATION = 300

  function scale() {
    scaleValue.setValue(0);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.easeOutBack
    }).start();
  }

  function getContent() {
    if (props.children) {
      return props.children;
    }
    return <Text style={styles.buttonText}>{props.text}</Text>;
  }

  const buttonScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1]
  });

  function makeAnimation() {
      if(props.position !== undefined) {
          setTimeout(() => {
            scale();
          }, DURATION * props.position);
      }
      return null
  }

  return (
    <TouchableWithoutFeedback onPress={props.onPressed}>
      <Animated.View
        style={[
          styles.button,
          "",
          {
            transform: [{ scale: buttonScale }]
          }
        ]}
      >
        { getContent() }
        { makeAnimation() }
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ScalingButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Resources.STATUS_BAR_COLOR,
    height: 50,
    width: 100,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
});
