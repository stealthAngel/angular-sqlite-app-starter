
import { DBSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
@Injectable()
export class CounterRepository {

  constructor(private databaseService: DatabaseService) {
  }

  async deleteCounterByMissionById(id: number): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from counters where missionId = ${id};`);
    });
  }

}
