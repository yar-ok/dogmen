import DatabaseSettings from '../utils/DatabaseSettings'

export const types = {
  ALL_ORDERS: 'ALL_ORDERS',
  ALL_WALKERS: 'ALL_WALKERS',
  FREE_PETS: 'FREE_PETS',
  CREATE_PET: 'CREATE_PET',
}

export const actionCreators = {
  getAllOrders: () => async(dispatch, getState) => {
    getOrders(dispatch)
  },

  getAllWalkers: () => async(dispatch, getState) => {
    DatabaseSettings.db().transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM walkers',
        [], (tx, results) => {
        let result = []
        for(let i=0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          result.push(row);
        }
        dispatch({
          type: types.ALL_WALKERS,
          walkers: result,
        })
      });
    });
  },

  getFreePets: () => async(dispatch, getState) => {
    getPets(dispatch)
  },

  createNewPet: (name) => async(dispatch, getState) => {
    DatabaseSettings.db().executeSql(
          'INSERT INTO pets (name) VALUES (\"' + name + '\")',
          [], (tx, results) => {

          getPets(dispatch)
        })
  },

  createOrder: (walkerId, petId) => async(dispatch, getState) => {
    DatabaseSettings.db().executeSql(
          'INSERT INTO orders (walker, pet) VALUES (' + walkerId + ', ' + petId + ')',
          [], (tx, results) => {
          getOrders(dispatch)
          getPets(dispatch)
        })
  },

  closeDatabase: () => async(dispatch, getState) => {
    DatabaseSettings.closeDatabase()
  },
}

function getOrders(dispatch) {
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

function getPets(dispatch) {
  DatabaseSettings.db().transaction((tx) => {
    tx.executeSql(
      'SELECT p.pet_id AS pet_id, p.name AS name FROM pets p LEFT OUTER JOIN orders o ON o.pet = p.pet_id WHERE o.walker IS NULL',
      [], (tx, results) => {
      let result = []
      for(let i=0; i < results.rows.length; i++) {
        let row = results.rows.item(i);
        result.push(row);
      }
      dispatch({
        type: types.FREE_PETS,
        pets: result,
      })
    });
  });
}
