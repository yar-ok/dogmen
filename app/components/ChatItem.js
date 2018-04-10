import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

const ChatItem = props => (
  <View style={styles.container}>
    <Text>{props.user.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default ChatItem;