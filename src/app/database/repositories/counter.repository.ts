import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { Counter_DB } from "src/app/database/models/database-models";
import { DatabaseService } from "../services/database.service";
@Injectable()
export class CounterRepository {
  constructor(private databaseService: DatabaseService) {}

  async getCountersByMissionId(id: number): Promise<Counter_DB[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var counters: DBSQLiteValues = await db.query(`select counters.* from counters where missionId = ${id} ORDER BY createdAt DESC;`);
      return counters.values as Counter_DB[];
    }, "get counters by mission id");
  }

  async getCounterById(id: number): Promise<Counter_DB> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = `select counters.* from counters where id = ${id}`;
      let ret: any = await db.query(sqlcmd);
      if (ret.values.length > 0) {
        return ret.values[0] as Counter_DB;
      }
      throw Error("get counter by id failed");
    });
  }

  async deleteCounterByMissionById(id: number): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from counters where missionId = ${id};`);
    });
  }

  async insertCounter(counter: Counter_DB): Promise<number> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "insert into counters (amount, missionId) values (?, ?)";
      let values: Array<any> = [counter.amount, counter.missionId];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.lastId > 0) {
        return ret.changes.lastId as Number;
      }
      throw Error("create counter failed");
    });
  }

  async updateCounter(counter: Counter_DB): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "update counters set amount = ? where id = ?";
      let values: Array<any> = [counter.amount, counter.id];
      await db.run(sqlcmd, values);
    });
  }

  async deleteCounterById(id: number): Promise<void> {
    this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from counters where id = ${id};`);
    });
  }
}
