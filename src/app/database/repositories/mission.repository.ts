import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { CounterRepository } from "./counter.repository";
import { DatabaseService } from "../services/database.service";
import { Mission } from "src/app/database/models/database-models";
@Injectable()
export class MissionRepository {
  constructor(private databaseService: DatabaseService, private counterRepository: CounterRepository) {}

  async getMissions(): Promise<Mission[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var sqlValues: DBSQLiteValues = await db.query(`select missions.* , COALESCE(SUM(counters.amount), 0) as countersAmountTotal from missions left join counters on counters.missionId = missions.id group by missions.id`);
      let missions: Mission[] = sqlValues.values;
      return missions;
    }, "get misions");
  }

  async insertMission(mission: Mission): Promise<number> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "insert into missions (name, description, endAmount) values (?, ?, ?)";
      let values: Array<any> = [mission.name, mission.description, mission.endAmount];
      let ret: any = await db.run(sqlcmd, values);
      return ret.changes.lastId;
    });
  }

  async updateMission(mission: Mission): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "update missions set name = ?, description = ?, endAmount = ? where id = ?";
      let values: Array<any> = [mission.name, mission.description, mission.endAmount, mission.id];
      await db.run(sqlcmd, values);
    });
  }
  async getMissionById(id: number): Promise<Mission> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = `select missions.* , COALESCE(SUM(counters.amount), 0) as countersAmountTotal from missions left join counters on counters.missionId = missions.id where missions.id = ${id} group by missions.id LIMIT 1`;
      let ret: any = await db.query(sqlcmd);
      return ret.values[0] as Mission;
    });
  }

  async deleteMissionById(id: number): Promise<void> {
    this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from missions where id = ${id};`);
    });
    await this.counterRepository.deleteCounterByMissionById(id);
  }
}
