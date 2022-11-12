import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { environment } from "src/environments/environment";
import { DatabaseService, myCallbackType } from "./database.service";
import { SQLiteService } from "./sqlite.service";

@Injectable({
  providedIn: "root",
})
export class DatabaseOldService implements DatabaseService {
  methodIsCalled = false;
  db: SQLiteDBConnection;

  constructor(private sqlite: SQLiteService) {}

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
