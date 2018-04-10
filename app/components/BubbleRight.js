import React, { Component } from "react";
import { StyleSheet, View , Text, Image } from "react-native";

const BubbleRight = props => (
  <View style={styles.container}>
    <View style={styles.bubble}>
      <Text>{props.user.name}</Text>
    </View>
    <Image source={{ uri: props.user.avatar }} style={styles.avatar} />
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  bubble: {
    backgroundColor: "red",
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

export default BubbleRight