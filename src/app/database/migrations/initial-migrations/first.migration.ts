import { DatabaseService } from "../../services/database.service";
import { MigrationBase } from "../migration-base";

export class FirstMigration extends MigrationBase {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  async up() {
    var query = `
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    this.databaseService.executeQuery((db) => {
      db.execute("select * from migrations");
    });

    this.databaseService.executeQuery((db) => {
      db.execute("select * from migrations");
    });

    // await this.databaseService.executeQuery(async (db) => {
    //   await db.execute(query);
    // });
    // await this.databaseService.executeQuery(async (db) => {
    //   await db.execute(query);
    //   await this.databaseService.executeQuery(async (db2) => {
    //     var x = await db2.execute("select * from migrations;");
    //     console.log(x);
    //   });
    // });
  }

  down() {
    throw new Error("Method not implemented.");
  }
}
