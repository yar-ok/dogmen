import DatabaseSettings from '../utils/DatabaseSettings'

export const types = {
  ALL_ORDERS: 'ALL_ORDERS',
}

export const actionCreators = {
  getAllOrders: () => async(dispatch, getState) => {
    DatabaseSettings.db().transaction((tx) => {
      tx.executeSql(
        'SELECT o.order_id, w.name AS walker_name, p.name AS pet_name FROM orders o INNER JOIN walkers w ON o.walker = w.walkers_id INNER JOIN pets p ON o.pet = p.pet_id',
        [], (tx, results) => {
        let result = []
        for(let i=0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          result.push(row);
        }
        dispatch({
          type: types.ALL_ORDERS,
          orders: result,
        })
      });
    });
  }
}
