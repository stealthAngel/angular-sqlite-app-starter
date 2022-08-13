import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { environment } from 'src/environments/environment';
import { SQLiteService } from './sqlite.service';
@Injectable()

export class DatabaseService {

  constructor(private sqlite: SQLiteService) {
  }

  async executeQuery<T>(callback: myCallbackType<T>): Promise<T> {
    try {
      let isConnection = await this.sqlite.isConnection(environment.databaseName);

      if (isConnection.result) {
        let db = await this.sqlite.retrieveConnection(environment.databaseName);
        return await callback(db);
      }
      else {
        const db = await this.sqlite.createConnection(environment.databaseName, false, "no-encryption", 1);
        await db.open();
        let cb = await callback(db);
        await db.close();
        await this.sqlite.closeConnection(environment.databaseName);
        return cb;
      }
    } catch (error) {
      throw Error(`error ${error}`);
    }
  }
}

interface myCallbackType<T> { (myArgument: SQLiteDBConnection): T }