import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

const UserItem = props => (
  <View style={styles.container}>
    <View style={{ backgroundColor: "white", padding: 12 }}>
      <Image source={{ uri: props.picture.thumbnail }} style={styles.photo} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10
  },
});

export default UserItem
