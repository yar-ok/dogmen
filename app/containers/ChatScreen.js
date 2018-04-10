import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import ChatItem from '../components/ChatItem'

import { connect } from "react-redux";
import { actionCreators } from "../actions/ChatActions";

const mapStateToProps = state => ({
  loading: state.chatState.loading,
  messages: state.chatState.messages,
  error: state.chatState.error
});

const mapDispatchToProps = dispatch => {
  return {
    getAllMessages: () => {
      dispatch(actionCreators.getAllChatMessages());
    },
    sendNewMessage: (message) => {
        dispatch(actionCreators.sendNewMessage(message));
    }
  };
};

class ChatComponent extends Component {
    componentDidMount() {
        this.props.getAllMessages()
    }

    renderFooter = () => {
        if (!this.props.loading) return null;

        return <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
            <ActivityIndicator animating size="large" />
          </View>;
    }

    render() {
        return <View style={styles.container}>
            <FlatList data={this.props.messages} inverted={true} numColumns={1} keyExtractor={item => item.id} renderItem={({ item }) => <ChatItem {...item} />} ListFooterComponent={this.renderFooter} />

            <View style={styles.sendContainer}>
              <TextInput style={styles.textInput} placeholder={"Enter your message..."} underlineColorAndroid="transparent" multiline={true} numberOfLines={1} selectionColor={"white"} />
              <TouchableOpacity style={styles.sendBtnContainer} onPress={() => this.props.sendNewMessage('Test message')}>
                <Text style={styles.sendBtn}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  },
  sendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "grey",
    marginTop: 4
  },
  textInput: {
    flex: 0.8,
    maxHeight: 90,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    color: "white",
    margin: 6
  },
  sendBtnContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  sendBtn: {
    color: "white",
    fontSize: 18
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)