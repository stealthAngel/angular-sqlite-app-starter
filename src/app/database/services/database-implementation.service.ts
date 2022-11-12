import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { environment } from "src/environments/environment";
import { DatabaseService, myCallbackType } from "./database.service";
import { SQLiteService } from "./sqlite.service";
@Injectable()
export class DatabaseImplementationService implements DatabaseService {
  methodIsCalled = false;
  databaseIsOpen = false;
  databaseIsOpenCalled = false;
  amountCalled = 0;
  db: SQLiteDBConnection;

  constructor(private sqlite: SQLiteService) {}

  async executeQuery<T>(callback: myCallbackType<T>, executedAgain = false): Promise<T> {
    try {
      //imagine 10 calls at the same time async calling at the same time

      if (!executedAgain) {
        this.amountCalled++; // keep track of how many times this method is called
      }

      if (!this.databaseIsOpen && !this.databaseIsOpenCalled) {
        this.databaseIsOpenCalled = true;
        this.db = await this.sqlite.createConnection(environment.databaseName, false, "no-encryption", 1);

        await this.db.open();

        this.databaseIsOpen = true;
        this.databaseIsOpenCalled = false;
      }

      // if two calls are made at the same time, the databaseIsOpen can be false although we check above for it and making it true
      //so recall this method and wait till the database is open
      if (!this.databaseIsOpen) {
        await this.sleep(100);
        return this.executeQuery(callback, true);
      }

      //execute all queries
      let cb = await callback(this.db);

      //only close the database when the last call is done

      if (this.databaseIsOpen && this.amountCalled === 1) {
        await this.db.close();
        await this.sqlite.closeConnection(environment.databaseName);
        this.databaseIsOpen = false;
      }

      //regardless of the amount of calls, we need to decrease the amountCalled
      this.amountCalled--;

      return cb;
    } catch (error) {
      this.methodIsCalled = false;
      throw Error(`error ${error}`);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
