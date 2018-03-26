export const types = {
  ALL_ORDERS: 'ALL_ORDERS',
}

let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase(
  {name: 'database.db', createFromLocation : "~database.db"},
  this.openCB, this.errorCB);

export const actionCreators = {
  getAllOrders: () => async(dispatch, getState) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM orders', [], (tx, results) => {
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
