import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import LeftBubble from './BubbleLeft'
import RightBubble from './BubbleRight'

const ChatItem = props => (
  <View style={styles.container}>
    {props.user.isMe ? <LeftBubble /> : <RightBubble />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatItem;