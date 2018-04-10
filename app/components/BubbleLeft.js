import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const BubbleLeft = props => (
  <View style={styles.container}>
    <Image source={{ uri: props.user.avatar }} style={styles.avatar} />
    <View style={styles.bubble}>
      <Text>{props.user.name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bubble: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginTop: 4
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10
  }
});

export default BubbleLeft;
