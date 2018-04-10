import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

const BubbleLeft = props => (
  <View style={styles.container}>
    <View style={styles.bubble}>
      <Text>this.props.user.name</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: "row"
    },
    bubble: {
        backgroundColor: "green",
        padding: 12,
        borderRadius: 8,
        marginTop: 4
    }
});

export default BubbleLeft;
