import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const OrderItem = (props) => (
  <View>
    <Text>Walker name: {props.walker_name} and Pet name: {props.pet_name}</Text>
  </View>
)

export default OrderItem
