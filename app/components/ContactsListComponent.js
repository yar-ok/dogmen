import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";

import ContactItem from './ContactItem'
import Permissions from "react-native-permissions";

import Contacts from 'react-native-contacts';

class ContactsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts() {
    this.checkContactsPermission();
  }

  showContacts() {
    // var Contacts = require("react-native-contacts");

    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        // error
        this.resetOption();
        alert("denied");
      } else if (contacts === undefined) {
        this.resetOption();
        alert("No contacts");
      } {
        this.setState({
            contacts: this.handleContactsList(contacts)
        })
      }
    });
  }

  checkContactsPermission() {
    Permissions.check("contacts").then(response => {
      if (response === "undetermined" || response === "denied") {
        Permissions.request("contacts").then(response => {
          if (response === "allow" || response === "authorized") {
            this.showContacts();
          } else {
            this.props.onError();
            alert("Permission denied");
          }
        });
      } else {
        this.showContacts();
      }
    });
  }

  handleContactsList(contacts) {
    let handled = []
    for(let contact of contacts) {
        for(let number of contact.phoneNumbers) {
          let contactForUpdate = Object.assign({}, contact);;
          console.log(number.number)
            contactForUpdate.number = number.number;
            handled.push(contactForUpdate)
        }
    }

    return handled
  }

  render() {
    return (
      <View style={{ height: this.state.contacts.length > 0 ? 200 : 0 }}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.contacts}
          numColumns={1}
          keyExtractor={item => item.recordID + item.number}
          renderItem={({ item }) => <ContactItem {...item} onSelected={this.props.onSelected}/>}
        />
      </View>
    );
  }
}

export default ContactsListComponent
