import { Platform } from 'react-native';

export const types = {
  ALL_ORDERS: 'ALL_ORDERS',
}

let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase(
  Platform.OS === 'ios' ?
    {name : "testDB.db", createFromLocation : 1}
  : {name: 'database.db', createFromLocation : "~database.db"},
  this.openCB, this.errorCB);

function  errorCB(err) {
  alert("SQL Error: " + err);
}

export const actionCreators = {
  getAllOrders: () => async(dispatch, getState) => {
    db.transaction((tx) => {
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
