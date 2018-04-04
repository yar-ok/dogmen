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

import { SwipeListView } from "react-native-swipe-list-view";

import UserItem from '../components/UserItem'
import AppHeaderTitle from "../components/AppHeaderTitle";
import Resources from "../utils/Resources";

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
      page: 1
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <AppHeaderTitle title="Swipeable list" />,
      headerTintColor: "white",
      headerRight: <View />,
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR
      }
    };
  };

  componentDidMount() {
    this.props.getAllUsers(
      this.state.page,
      this.props.users === undefined ? [] : this.props.users
    );
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

  closeRow(rowData, rowMap) {
    // if (rowMap[rowKey]) {
    //   rowMap[rowKey].closeRow();
    // }
    // rowMap[rowData.item.key].closeRow();
    alert("rowKey -> " + rowKey + "   ");
  }

  render() {
    return <View>
        <SwipeListView useFlatList keyExtractor={item => item.email} data={this.props.users} renderItem={({ item }) => <UserItem {...item} />} renderHiddenItem={(rowData, rowMap) => <View style={styles.rowBack}>
              <Text>Left</Text>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => this.closeRow(rowData, rowMap)}>
                <Text style={styles.backTextWhite}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>
            </View>} leftOpenValue={75} rightOpenValue={-150} stopLeftSwipe={160} stopRightSwipe={-220} ItemSeparatorComponent={this.renderSeparator} ListFooterComponent={this.renderFooter} onEndReachedThreshold={0.5} onEndReached={this.handleLoadMore} />
      </View>;
  }
}

const styles = StyleSheet.create({
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backTextWhite: {
    color: "#FFF"
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SwipeItemsScreen)
