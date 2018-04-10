import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const ChatItem = props => (
  <View style={styles.container}>
    <ImageBackground source={require("../images/bubble_out_8.9.png")} style={styles.backgroundContainer}>
      <Text>{props.user.name}</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
    minHeight: 50,
  }
});

export default ChatItem;