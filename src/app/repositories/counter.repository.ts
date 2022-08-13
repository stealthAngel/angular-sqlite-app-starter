
import { DBSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Counter } from '../models/counter';
@Injectable()
export class CounterRepository {

  constructor(private databaseService: DatabaseService) {
  }

  async getCountersByMissionId(id: number): Promise<Counter[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var counters: DBSQLiteValues = await db.query( `select counters.* from counters where missionId = ${id}`);
      return counters.values as Counter[];
    });
  }

  async deleteCounterByMissionById(id: number): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from counters where missionId = ${id};`);
    });
  }

  async createCounter(counter: Counter): Promise<Counter> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "insert into counters (amount, missionId) values (?, ?)";
      let values: Array<any> = [counter.amount, counter.missionId];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.lastId > 0) {
        return ret.changes as Counter;
      }
      throw Error('create counter failed');
    })
  }
}
