import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";

const ContactItem = props => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.container}
    onPress={() => props.onSelected(props) }
  >
    { getImageView(props.hasThumbnail, props.thumbnailPath) }
    <Text style={ styles.name }>{props.givenName} {props.familyName}</Text>
    <Text style={ styles.phone }>{props.number}</Text>
  </TouchableOpacity>
);
export default ContactItem;

function getImageView(hasThumbnail, thumbnailPath) {
    if(hasThumbnail) {
        return <Image source={{ uri: thumbnailPath }} style={styles.photo} />;
    } else {
        return <Image source={ require("../images/splash_image.png") } style={styles.photo} />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  photo: {
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white"
  },
  name: {
    fontSize: 16,
    color: "white",
    margin: 10
  },
  phone: {
    fontSize: 14,
    color: "grey"
  }
});
