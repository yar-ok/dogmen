import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";

import UserItem from '../components/UserItem'

import { connect } from "react-redux";
import { actionCreators } from "../actions/ApiActions";

const mapStateToProps = state => ({
  loading: state.apiState.loading,
  users: state.apiState.users,
  error: state.apiState.error
});

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(actionCreators.getAllUsers());
    }
  };
};

class SwipeItemsScreen extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  
  render() {
    return (
      <View>
        <FlatList 
        data={this.props.users} 
        numColumns={1} 
        keyExtractor={item => item.email} 
        renderItem={({ item }) => <UserItem {...item} />} />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeItemsScreen)