
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
      var counters: DBSQLiteValues = await db.query(`select counters.* from counters where missionId = ${id}`);
      return counters.values as Counter[];
    }, 'get counters by mission id');
  }

  async getCounterById(id: number): Promise<Counter> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = `select counters.* from counters where id = ${id}`;
      let ret: any = await db.query(sqlcmd);
      if (ret.values.length > 0) {
        return ret.values[0] as Counter;
      }
      throw Error('get counter by id failed');
    });
  }

  async deleteCounterByMissionById(id: number): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from counters where missionId = ${id};`);
    });
  }

  async insertCounter(counter: Counter): Promise<number> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "insert into counters (amount, missionId) values (?, ?)";
      let values: Array<any> = [counter.amount, counter.missionId];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.lastId > 0) {
        return ret.changes.lastId as Number;
      }
      throw Error('create counter failed');
    })
  }

  async deleteCounterById(id: number): Promise<void> {
    this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from counters where id = ${id};`);
    });
  }
}
