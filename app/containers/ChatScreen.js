import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  InteractionManager
} from "react-native";

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

import ChatItem from '../components/ChatItem'

import AppHeaderTitle from "../components/AppHeaderTitle";
import Resources from "../utils/Resources";

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
    sendNewMessage: (message, messages) => {
      dispatch(actionCreators.sendNewMessage(message, messages));
    },
    deleteAllMessages: () => {
      dispatch(actionCreators.deleteAllMessages())
    },
    selectMessage: (messageId, messages) => {
      dispatch(actionCreators.selectMessage(messageId, messages))
    },
    deleteSelectedMessages: (messages) => {
      dispatch(actionCreators.deleteSelectedMessages(messages))
    }
  };
};

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return { headerTitle: <AppHeaderTitle title="Chat" />, headerTintColor: "white", headerRight: <Menu>
          <MenuTrigger style={{ padding: 16 }} onPress={() => params.updateNavigationParams()}>
            <Image source={require("../images/ic_more.png")} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginTop: 40 }}>
            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
            <MenuOption onSelect={() => params.deleteAllMessages()}>
              <Text style={{ color: "red" }}>Delete all</Text>
            </MenuOption>
            <MenuOption onSelect={() => params.deleteSelectedMessages()} disabled={params.checkSelected} text="Delete selected" />
          </MenuOptions>
        </Menu>, headerStyle: { backgroundColor: Resources.TOOLBAR_COLOR } };
  };

  deleteAllMessages = () => {
    this.props.deleteAllMessages();
  };

  deleteSelectedMessages = () => {
    this.props.deleteSelectedMessages(this.props.messages);
  };

  componentDidMount() {
    this.props.getAllMessages();
    InteractionManager.runAfterInteractions(() => {
      this.setNavigationParams();
    });
  }

  setNavigationParams = () => {
    this.props.navigation.setParams({
      deleteAllMessages: this.deleteAllMessages,
      deleteSelectedMessages: this.deleteSelectedMessages,
      updateNavigationParams: this.setNavigationParams,
      checkSelected: !this.isSelectedMessages()
    });
  };

  isSelectedMessages = () => {
    if (this.props.messages === undefined) {
      return false;
    }

    return this.getSelectedMessages().length > 0;
  };

  getSelectedMessages = () => {
    if (this.props.messages === undefined) {
      return [];
    }

    let selectedMessages = [];
    for (let mes of this.props.messages) {
      if (mes.isSelected) {
        selectedMessages.push(mes);
      }
    }

    return selectedMessages;
  };

  renderLoading = () => {
    if (!this.props.loading) return null;
    return (
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          alignItems: "center",
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  updateMessage = message => {
    this.setState({
      message: message
    });
  };

  sendMessage = () => {
    if (this.state.message.trim() === "") {
      alert("Message can't be blank!");
    } else {
      this.props.sendNewMessage(this.state.message.trim(), this.props.messages);
      this.updateMessage("");
    }
  };

  messageSelected(messageId) {
    this.props.selectMessage(messageId, this.props.messages);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.messages}
          inverted={true}
          numColumns={1}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ChatItem
              {...item}
              messageSelected={messageId => this.messageSelected(messageId)}
            />
          )}
        />
        <View style={styles.sendContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={"Enter your message..."}
            underlineColorAndroid="transparent"
            multiline={true}
            numberOfLines={1}
            value={this.state.message}
            selectionColor={"white"}
            onChangeText={text => this.updateMessage(text)}
          />
          <TouchableOpacity
            style={styles.sendBtnContainer}
            onPress={() => this.sendMessage()}
          >
            <Text style={styles.sendBtn}>Send</Text>
          </TouchableOpacity>
        </View>
        {this.renderLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1
  },
  sendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Resources.APP_COLOR,
    marginTop: 4
  },
  textInput: {
    flex: 0.8,
    maxHeight: 90,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    color: "white",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 12,
    marginBottom: 12,
    paddingBottom: 0,
    paddingTop: 0
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