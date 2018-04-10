import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const BubbleLeft = props => (
  <View style={styles.container}>
    {getAvatarView(props)}
    <View style={styles.bubble}>
      <Text>{props.message}</Text>
    </View>
  </View>
);

function getAvatarView(props) {
  if (props.isLastUserMessage) {
    return <Image source={{ uri: props.user.avatar }} style={styles.avatar} />;
  } else {
    return <View style={styles.avatar} />;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
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
