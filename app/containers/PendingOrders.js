import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, TextInput, View, Button, TouchableOpacity, Modal, Dimensions } from 'react-native';

import AppPicker from '../components/AppPicker'

import AppHeaderTitle from '../components/AppHeaderTitle'

import AddOrderButton from '../components/AppButton'
import Resources from '../utils/Resources'

import { connect } from 'react-redux'
import { actionCreators } from '../actions/OrderActions'

import OrderItem from '../components/OrderItem'
import Utils from '../utils/Utils'

const DEFAULT_VALUE = -1;

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const POPUP_MARGIN = 12;

const mapStateToProps = (state) => ({
  // loading: state.loading,
  orders: state.ordersState.orders,
  walkers: state.ordersState.walkers,
  //only pets without walkers
  pets: state.ordersState.pets,
});

const mapDispatchToProps = (dispatch) => {
  return {
      getAllOrdersFromDB: () => { dispatch(actionCreators.getAllOrders()) },
      getAllWalkersFromDB: () => { dispatch(actionCreators.getAllWalkers()) },
      getFreePetsFromDB: () => { dispatch(actionCreators.getFreePets()) },
      createNewPet: (name) => { dispatch(actionCreators.createNewPet(name)) },
      createOrder: (walkerId, petId) => { dispatch(actionCreators.createOrder(walkerId, petId)) },
      closeDatabase: () => { dispatch(actionCreators.closeDatabase()) },
  }
}

class PendingOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      showDialog: false,
      showAddNewPetDialog: false,
      selectedWalker: DEFAULT_VALUE,
      selectedPet: DEFAULT_VALUE,
      newPetName: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <AppHeaderTitle title='Pending Orders'/>
      ),
      headerTintColor: 'white',
      headerRight: <View/>,
      headerStyle: {
        backgroundColor: Resources.TOOLBAR_COLOR,
      },
    }
  };

  showDialog = () => {
    this.setState({
      showDialog: true,
    })
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
    })
  }

  componentDidMount() {
    this.props.getAllOrdersFromDB()
    this.props.getAllWalkersFromDB()
    this.props.getFreePetsFromDB()
  }

  componentWillUnmount() {
    this.props.closeDatabase()
  }

  selectedWalkerChanged = (itemIndex) => {
    this.setState({
      selectedWalker: itemIndex,
    })
  }

  selectedPetChanged = (itemIndex) => {
    this.setState({
      selectedPet: itemIndex,
    })
  }

  showAddNewPetDialog = () => {
    this.setState({
      showAddNewPetDialog: true,
      newPetName: '',
    })
  }

  hideAddNewPetDialog = () => {
    this.setState({
      showAddNewPetDialog: false
    })
  }

  updatePetName = (name) => {
    this.setState({
      newPetName: name
    })
  }

  saveNewPet = () => {
    if (this.state.newPetName.trim() === '') {
      Utils.showAlert('Pet name can not be empty', null)
    } else {
      this.setState({
        showAddNewPetDialog: false,
      })
      this.props.createNewPet(this.state.newPetName.trim())
    }
  }

  saveNewOrder = () => {
    let selectedWalker = this.state.selectedWalker
    let selectedPet = this.state.selectedPet
    let walkersLength = this.props.walkers.length
    let petsLength = this.props.pets.length
    if (selectedWalker === DEFAULT_VALUE) {
      selectedWalker = walkersLength > 0 ? 0 : DEFAULT_VALUE
    } else if (selectedWalker => walkersLength) {
      selectedWalker = walkersLength - 1
    }
    if (selectedPet === DEFAULT_VALUE) {
      selectedPet = petsLength > 0 ? 0 : DEFAULT_VALUE
    } else if (selectedPet => petsLength) {
      selectedPet = petsLength - 1
    }

    if (selectedWalker !== DEFAULT_VALUE && selectedPet!== DEFAULT_VALUE) {
      this.closeDialog()
      this.props.createOrder(
        this.props.walkers[selectedWalker].walkers_id,
        this.props.pets[selectedPet].pet_id
      )
    } else {
      alert('Select walker and pet')
    }
  }

  specificPopup = () => {
    if (this.state.showAddNewPetDialog) {
      return <TouchableOpacity onPress={() => 0} activeOpacity={1} style={styles.editablePopup}>
      <Text style={{fontWeight: 'bold', fontSize: 19, color: 'black'}}>Add new pet</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter pet name'
        underlineColorAndroid='transparent'
        multiline={false}
        maxLength = {40}
        selectionColor={'black'}
        textAlign={'center'}
        returnKeyType={'done'}
        onChangeText={(text) => this.updatePetName(text)}/>
        <Button
        style={{width: 100}}
          onPress={() => this.saveNewPet()}
          title="Save pet"
          color={Resources.APP_COLOR}/>
      </TouchableOpacity>
    } else {
      // alert('in popup pets -> ' + this.props.pets.length)
      return <TouchableOpacity onPress={() => 0} activeOpacity={1} style={styles.popup}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>Walker</Text>
            <AppPicker
              selectedWalker={this.state.selectedWalker}
              walkers={this.props.walkers}
              selectedWalkerChanged={(itemIndex) => this.selectedWalkerChanged(itemIndex)} />
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>Pet</Text>
            <AppPicker
              selectedWalker={this.state.selectedPet}
              walkers={this.props.pets}
              selectedWalkerChanged={(itemIndex) => this.selectedPetChanged(itemIndex)} />
              <Button
                onPress={() => this.showAddNewPetDialog()}
                title="Add pet"
                color={Resources.APP_COLOR}/>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <AddOrderButton text='Save order' onPressed={() => this.saveNewOrder()} />
        </View>
      </TouchableOpacity>
    }
  }

  render() {
    return(
      <View>
        <View style={{ alignItems: 'center' }}>
          <AddOrderButton text='Add Order' onPressed={() => this.showDialog()} />
        </View>

        <FlatList
            data={this.props.orders}
            numColumns={1}
            keyExtractor={item => item.order_id.toString()}
            renderItem={({item}) =>
              <OrderItem {...item} />
            }
          />
          <Modal
              transparent={true}
              visible={this.state.showDialog}
              animationType={'fade'}
              onRequestClose={() => this.closeDialog()}>
              <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.closeDialog()}
              style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(19, 19, 19, 0.6)'}}>
                {this.specificPopup()}
            </TouchableOpacity>
          </Modal>
      </View>
    )
  }
}

const popupWidth = SCREEN_WIDTH - 2 * POPUP_MARGIN;

const styles = StyleSheet.create({
  popup: {
    width: popupWidth,
    backgroundColor:'white',
    borderRadius: 5,
    padding: 8,
  },

  editablePopup: {
    width: popupWidth,
    backgroundColor:'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  dropdownContainer: {
    flex: 1,
  },

  dropdownTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {

    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    color: 'black',
    margin: 5,

    justifyContent: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders)
