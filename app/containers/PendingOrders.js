import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';

import AppHeaderTitle from '../components/AppHeaderTitle'

import AddOrderButton from '../components/AppButton'
import Resources from '../utils/Resources'

import { connect } from 'react-redux'
import { actionCreators } from '../actions/OrderActions'

import OrderItem from '../components/OrderItem'

const mapStateToProps = (state) => ({
  // loading: state.loading,
  orders: state.ordersState.orders,
});

const mapDispatchToProps = (dispatch) => {
  return {
      getAllOrdersFromDB: () => { dispatch(actionCreators.getAllOrders()) },
  }
}

class PendingOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
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

  componentDidMount() {
    this.props.getAllOrdersFromDB()
  }

  render() {

    return(
      <View>
        <View style={{ alignItems: 'center' }}>
          <AddOrderButton text='Add Order' />
        </View>

        <FlatList
            data={this.props.orders}
            numColumns={1}
            keyExtractor={item => item.order_id.toString()}
            renderItem={({item}) =>
              <OrderItem {...item} />
            }
          />

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders)
