import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
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
    getAllUsers: (page, users) => {
      dispatch(actionCreators.getAllUsers(page, users));
    }
  };
};

class SwipeItemsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
  }

  componentDidMount() {
    this.props.getAllUsers(this.state.page, this.props.users === undefined ? [] : this.props.users);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.props.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.getAllUsers(this.state.page, this.props.users);
      }
    );
  };

  render() {
    return <View>
        <FlatList data={this.props.users} numColumns={1} keyExtractor={item => item.email} renderItem={({ item }) => <UserItem {...item} />}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0} onEndReached={this.handleLoadMore} />
      </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeItemsScreen)
