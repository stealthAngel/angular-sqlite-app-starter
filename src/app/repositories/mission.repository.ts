
import { DBSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Mission } from '../models/Mission';
import { CounterRepository } from './counter.repository';
@Injectable()
export class MissionRepository {

  constructor(private databaseService: DatabaseService, private counterRepository: CounterRepository) {
  }

  async getMissions(): Promise<Mission[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var missions: DBSQLiteValues = await db.query(`select missions.* , COALESCE(SUM(counters.amount), 0) as totalAmount from missions left join counters on counters.missionId = missions.id group by missions.id`);
      return missions.values as Mission[];
    });
  }

  async createMission(mission: Mission) {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "insert into missions (name, description, endAmount) values (?, ?, ?)";
      let values: Array<any> = [mission.name, mission.description, mission.endAmount];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.lastId > 0) {
        return ret.changes as Mission;
      }
      throw Error('create mission failed');
    });
  }

  async updateMission(mission: Mission) {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "update missions set name = ?, description = ?, endAmount = ? where id = ?";
      let values: Array<any> = [mission.name, mission.description, mission.endAmount, mission.id];
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.changes > 0) {
        return await this.getMissionById(mission.id);
      }
      throw Error('update mission failed');
    });
  }
  async getMissionById(id: number): Promise<Mission> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = `select missions.* , COALESCE(SUM(counters.amount), 0) as totalAmount from missions left join counters on counters.missionId = missions.id where missions.id = ${id} group by missions.id LIMIT 1`;
      let values: Array<any> = [id];
      let ret: any = await db.query(sqlcmd, values);
      if (ret.values.length > 0) {
        return ret.values[0] as Mission;
      }
      throw Error('get mission by id failed');
    });
  }
  async deleteMissionById(id: number): Promise<void> {
    this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from missions where id = ${id};`);
    });
    await this.counterRepository.deleteCounterByMissionById(id);
  }

}
