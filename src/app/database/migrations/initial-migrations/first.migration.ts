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

    await this.databaseService.executeQuery(async (db) => {
      await db.execute(query);
    });
  }

  down() {
    throw new Error("Method not implemented.");
  }
}
