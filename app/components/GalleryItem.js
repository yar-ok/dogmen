import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width;
const PRODUCT_ITEM_MARGIN = 8;
const NUM_COLUMNS = 3;

const GalleryItem = props => (
  <TouchableOpacity
    onPress={() => props.onSelected !== undefined ? props.onSelected(props.node.image.uri) : 0}
  >
    <Image source={{ uri: props.node.image.uri }} style={styles.photo} />
  </TouchableOpacity>
);
export default GalleryItem

const itemWidth =
  (SCREEN_WIDTH - NUM_COLUMNS * 2 * PRODUCT_ITEM_MARGIN) / NUM_COLUMNS;

const styles = StyleSheet.create({
  photo: {
    height: itemWidth,
    width: itemWidth,
    margin: PRODUCT_ITEM_MARGIN,
    borderRadius: 2
  }
});