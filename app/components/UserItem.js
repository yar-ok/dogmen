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
    <View
      style={{ backgroundColor: "white", padding: 12, flexDirection: "row" }}>
      <Image source={{ uri: props.picture.thumbnail }} style={styles.photo} />
      <View>
        <Text>{`${props.name.first} ${props.name.last}`}</Text>
        <Text>{props.email}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10
  },
});

export default UserItem
