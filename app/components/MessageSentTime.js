import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

const SentTime = props => (
    <View style={ styles.container }>
        <Text style={ styles.text }>{props.sent_time}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  text: {
    fontSize: 12,
  }
});

export default SentTime;
