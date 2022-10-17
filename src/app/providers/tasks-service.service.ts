import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class TasksServiceService {

  // public properties

  db: SQLiteObject = null;

  constructor() {}

  // public methods

  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  create(task: any) {
    const sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [task.title, task.completed]);
  }

  createTable() {
    const sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    return this.db.executeSql(sql, []);
  }

  delete(task: any) {
    const sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

  getAll() {
    const sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
    .then(response => {
      const tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  update(task: any) {
    const sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

}
