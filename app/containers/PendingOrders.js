import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Button, TouchableOpacity, Modal, Dimensions } from 'react-native';

import AppPicker from '../components/AppPicker'

import AppHeaderTitle from '../components/AppHeaderTitle'

import AddOrderButton from '../components/AppButton'
import Resources from '../utils/Resources'

import { connect } from 'react-redux'
import { actionCreators } from '../actions/OrderActions'

import OrderItem from '../components/OrderItem'

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
  }
}

class PendingOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      showDialog: false,
      selectedWalker: DEFAULT_VALUE,
      selectedPet: DEFAULT_VALUE,
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
                <TouchableOpacity onPress={() => 0} activeOpacity={1} style={styles.popup}>
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
                </TouchableOpacity>
              </TouchableOpacity>
          </Modal>
      </View>
    )
  }
}

const popupWidth = SCREEN_WIDTH - 2 * POPUP_MARGIN;

const styles = StyleSheet.create({
  popup: {
    height: 250,
    width: popupWidth,
    backgroundColor:'white',
    borderRadius: 5,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders)
