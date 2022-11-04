import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { environment } from "src/environments/environment";
import { SQLiteService } from "./sqlite.service";
@Injectable()
export class DatabaseService {
  methodIsCalled = false;
  constructor(private sqlite: SQLiteService) {}

  executeQuery2<T>(callback: myCallbackType<T>): Promise<T> {
    const db = this.sqlite
      .createConnection(environment.databaseName, false, "no-encryption", 1)
      .then((x) => {
        x.open()
          .then((y) => {
            let cb = callback(x);
            x.close();
            this.sqlite.closeConnection(environment.databaseName);
            Promise.resolve(cb);
          })
          .catch((err) => {
            throw Error(`error ${err}`);
          });
      })
      .catch((err) => {
        throw Error(`error ${err}`);
      });
    throw Error(`error ${db}`);
  }

  async executeQuery<T>(callback: myCallbackType<T>, debugString: string = ""): Promise<T> {
    try {
      if (this.methodIsCalled) {
        await this.sleep(100);
        return this.executeQuery(callback, debugString);
      }

      this.methodIsCalled = true;

      const db = await this.sqlite.createConnection(environment.databaseName, false, "no-encryption", 1);

      await db.open();

      let cb = await callback(db);

      await db.close();

      await this.sqlite.closeConnection(environment.databaseName);

      this.methodIsCalled = false;

      return cb;
    } catch (error) {
      this.methodIsCalled = false;
      throw Error(`error ${error} .... ${debugString}`);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

interface myCallbackType<T> {
  (myArgument: SQLiteDBConnection): T;
}
