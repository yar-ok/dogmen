import React, { Component } from "react";
import { StyleSheet, View , Text, Image, TouchableOpacity } from "react-native";
import Resources from "../utils/Resources";

const BubbleRight = props => (
  <View style={styles.container}>
    {getSelectedView(props)}
    <TouchableOpacity
      onLongPress={e => props.messageSelected(props.id)}
      activeOpacity={1}
      style={styles.bubble}
    >
      <Text>{props.message}</Text>
    </TouchableOpacity>
    {getAvatarView(props)}
  </View>
);

function getSelectedView(message) {
  if (message.isSelected) {
    return <View style={styles.selected}>
        <Image source={require("../images/ic_done.png")} style={{ resizeMode: "center" }} />
      </View>;
  } else {
    return null;
  }
}

function getAvatarView(props) {
    if(props.isLastUserMessage) {
        return <Image source={{ uri: props.user.avatar }} style={styles.avatar} />;
    } else {
        return <View style={styles.avatar} />
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
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
  },
  selected: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 6,
    marginLeft: 6,
    marginTop: 6,
    backgroundColor: Resources.APP_COLOR
  }
});

export default BubbleRight