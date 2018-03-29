import { Platform } from 'react-native';

const database_version = '1';

const DatabaseSettings = {
  db() {
    let SQLite = require('react-native-sqlite-storage')
    return SQLite.openDatabase(
      Platform.OS === 'ios' ?
        {name : "testDB.db", createFromLocation : 1}
      : {name: 'database.db', createFromLocation : "~database.db"},
      this.openCB, this.errorCB);
  },

  initDatabase() {
    let db = this.db()
    db.executeSql('DROP TABLE IF EXISTS orders;');
    db.executeSql('DROP TABLE IF EXISTS pets;');
    db.executeSql('DROP TABLE IF EXISTS walkers;');

    db.executeSql(
      'CREATE TABLE pets('
      + 'pet_id  INTEGER PRIMARY KEY AUTOINCREMENT,'
      + 'name  TEXT); ',
      [], this.successCB, this.errorCB
    );

    db.executeSql(
      'CREATE TABLE walkers('
      + 'walkers_id  INTEGER PRIMARY KEY AUTOINCREMENT,'
      + 'name  TEXT, image TEXT); ',
      [], this.successCB, this.errorCB
    );

    db.executeSql(
      'CREATE TABLE orders('
      + 'order_id  INTEGER PRIMARY KEY AUTOINCREMENT,'
      + 'walker  INTEGER, pet INTEGER,'
      + 'FOREIGN KEY(pet) REFERENCES pets(pet_id)'
      + 'FOREIGN KEY(walker) REFERENCES walkers(walkers_id)); ',
      [], this.successCB, this.errorCB
    );

    db.executeSql('INSERT INTO pets (name) VALUES ("Joice(Mastif)");', []);
    db.executeSql('INSERT INTO pets (name) VALUES ("Altai(Alabai)");', []);
    db.executeSql('INSERT INTO pets (name) VALUES ("Fox(Boxer)");', []);
    db.executeSql('INSERT INTO pets (name) VALUES ("Tom(Taxa)");', []);
    db.executeSql('INSERT INTO pets (name) VALUES ("Fred(Dog)");', []);

    db.executeSql('INSERT INTO walkers (name) VALUES ("Alex Marik");', []);
    db.executeSql('INSERT INTO walkers (name) VALUES ("Tom Hanks");', []);
    db.executeSql('INSERT INTO walkers (name) VALUES ("Bob Dilan");', []);
    db.executeSql('INSERT INTO walkers (name) VALUES ("Lionel Messi");', []);
    db.executeSql('INSERT INTO walkers (name) VALUES ("Mikle Tompson");', []);
    db.executeSql('INSERT INTO walkers (name) VALUES ("Vova Ivanov");', []);

    db.executeSql('INSERT INTO orders (walker, pet) VALUES (1, 1);', []);
    db.executeSql('INSERT INTO orders (walker, pet) VALUES (1, 2);', []);
    db.executeSql('INSERT INTO orders (walker, pet) VALUES (2, 3);', []);

    db.close()
  }

}

// function  errorCB(err) {
//   alert("SQL Error: " + err);
// }

export default DatabaseSettings