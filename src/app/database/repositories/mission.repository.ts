import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Injectable } from "@angular/core";
import { CounterRepository } from "./counter.repository";
import { DatabaseService } from "../services/database.service";
import { Mission_DB } from "src/app/database/models/database-models";
import { MissionOrderIndexObject } from "src/app/models/mission/mission";
@Injectable()
export class MissionRepository {
  constructor(private databaseService: DatabaseService, private counterRepository: CounterRepository) {}

  async getMissions(): Promise<Mission_DB[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var sqlValues: DBSQLiteValues = await db.query(`select missions.* , COALESCE(SUM(counters.amount), 0) as currentTotalAmount from missions left join counters on counters.missionId = missions.id group by missions.id order by missions.orderIndex`);
      let missions: Mission_DB[] = sqlValues.values;
      return missions;
    });
  }

  async insertMission(mission: Mission_DB): Promise<number> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const getMaxOrderIndex = async (): Promise<number> => {
        var sqlValues: DBSQLiteValues = await db.query(`select max(orderIndex) as maxOrderIndex from missions`);
        let maxOrderIndex: number = sqlValues.values[0].maxOrderIndex;
        return maxOrderIndex;
      };
      let orderIndex: number = (await getMaxOrderIndex()) + 1;
      console.log("🚀 ~ file: mission.repository.ts:27 ~ MissionRepository ~ returnthis.databaseService.executeQuery<any> ~ orderIndex:", orderIndex)

      let sqlcmd: string = "insert into missions (name, description, targetAmount, orderIndex) values (?, ?, ?, ?)";
      let values: Array<any> = [mission.name, mission.description, mission.targetAmount, orderIndex];
      let ret: any = await db.run(sqlcmd, values);
      return ret.changes.lastId;
    });
  }

  async updateMission(mission: Mission_DB): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "update missions set name = ?, description = ?, targetAmount = ? where id = ?";
      let values: Array<any> = [mission.name, mission.description, mission.targetAmount, mission.id];
      await db.run(sqlcmd, values);
    });
  }
  async getMissionById(id: number): Promise<Mission_DB> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = `select missions.* , COALESCE(SUM(counters.amount), 0) as currentTotalAmount from missions left join counters on counters.missionId = missions.id where missions.id = ${id} group by missions.id LIMIT 1`;
      let ret: any = await db.query(sqlcmd);
      return ret.values[0] as Mission_DB;
    });
  }

  async deleteMissionById(id: number): Promise<void> {
    this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`delete from missions where id = ${id};`);
    });
    await this.counterRepository.deleteCounterByMissionById(id);
  }

  async reOrderMissions(missions: MissionOrderIndexObject[]): Promise<void> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      for (let i = 0; i < missions.length; i++) {
        let sqlcmd: string = "update missions set orderIndex = ? where id = ?";
        let values: Array<any> = [i, missions[i].id];
        await db.run(sqlcmd, values);
      }
    });
  }
}
