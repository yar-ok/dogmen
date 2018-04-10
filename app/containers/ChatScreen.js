import React, { Component } from "react";
import { StyleSheet, FlatList, ActivityIndicator, View } from "react-native";
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
        return(
            <View style={{ flex: 1 }}>
                <FlatList
                style={styles.container}
                data={this.props.messages}
                numColumns={1}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ChatItem {...item}/>}
                ListFooterComponent={this.renderFooter} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)