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
  InteractionManager,
  CameraRoll
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
import OptionBtn from "../components/OptionBtn"
import { Camera, Gallery, Contacts } from "../utils/Constants";
import GalleryComponent from "../components/GalleryComponent"
import { connect } from "react-redux";
import { actionCreators } from "../actions/ChatActions";

const WRONG_VALUE = 0;

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
      message: "",
      currentOption: WRONG_VALUE
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return { headerTitle: <AppHeaderTitle title="Chat" />, headerTintColor: "white", headerRight: <Menu>
          <MenuTrigger style={{ padding: 16 }} onPress={() => params.updateNavigationParams()}>
            <Image source={require("../images/ic_more.png")} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginTop: 40 }}>
            <MenuOption onSelect={() => alert(`Save`)}>
              <Text style={{ color: "red" }}>Save </Text>
            </MenuOption>
            <MenuOption onSelect={() => params.deleteAllMessages()} disabled={params.messagesEmpty} text="Delete all"/>
            <MenuOption onSelect={() => params.deleteSelectedMessages()} disabled={params.checkSelected} text="Delete selected" />
          </MenuOptions>
        </Menu>, headerStyle: { backgroundColor: Resources.TOOLBAR_COLOR } };
  };

  showOption(option, isSelected) {
    this.setState({
      currentOption: isSelected ? option : WRONG_VALUE
    })
  }

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
      checkSelected: !this.isSelectedMessages(),
      messagesEmpty: this.isMessagesEmpty()
    });
  };

  isSelectedMessages = () => {
    if (this.props.messages === undefined) {
      return false;
    }

    return this.getSelectedMessages().length > 0;
  };

  isMessagesEmpty= () => {
    if (this.props.messages === undefined) {
      return true
    }

    return this.props.messages.length === 0
  }

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

  getBottomListView() {
    switch(this.state.currentOption) {
      case Gallery:
        return <GalleryComponent onSelected={(uri) => this.onGalleryItemClicked(uri)}/>;
      case Camera:
        // alert("Camera");
        break;
      case Contacts:
        // alert("Contacts");
        break;
    }

    return null
  }

  onGalleryItemClicked(uri) {
    alert('URI: ' + uri)
    this.setState({
      currentOption: WRONG_VALUE
    })
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
        <View style={ styles.bottomLayout }>
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
          <View style={ styles.optionsLayout }>
            <OptionBtn type={Gallery} onPress={(isSelected) => this.showOption(Gallery, isSelected)} isNeedUnselect={this.state.currentOption != Gallery}/>
            <OptionBtn type={Camera} onPress={(isSelected) => this.showOption(Camera, isSelected)} isNeedUnselect={this.state.currentOption != Camera}/>
            <OptionBtn type={Contacts} onPress={(isSelected) => this.showOption(Contacts, isSelected)} isNeedUnselect={this.state.currentOption != Contacts}/>
          </View>

          { this.getBottomListView() }
        </View>
        {this.renderLoading()}
      </View>
    );
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
    justifyContent: "space-between"
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
  },
  bottomLayout: {
    backgroundColor: Resources.APP_COLOR,
    marginTop: 4
  },
  optionsLayout: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 4,
    marginBottom: 6
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)