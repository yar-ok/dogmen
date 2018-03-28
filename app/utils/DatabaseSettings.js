import { Platform } from 'react-native';

const DatabaseSettings = {
  db() {
    let SQLite = require('react-native-sqlite-storage')
    return SQLite.openDatabase(
      Platform.OS === 'ios' ?
        {name : "testDB.db", createFromLocation : 1}
      : {name: 'database.db', createFromLocation : "~database.db"},
      this.openCB, this.errorCB);
  }
}

// function  errorCB(err) {
//   alert("SQL Error: " + err);
// }

export default DatabaseSettings
