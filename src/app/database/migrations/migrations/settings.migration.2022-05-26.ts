import { DatabaseService } from "../../services/database.service";
import { MigrationBase } from "../migration-base";

export class settings_migration_2022_05_26 extends MigrationBase {
  constructor(private databaseService: DatabaseService) {
    super();
  }
  async up() {
    var query = `
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_SCROLL_TO_TOP', 'true', 1);
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_SHOW_MISSION_COMPLETED_COLOR', 'true', 2);
    INSERT INTO settings (name, value, orderIndex) VALUES ('COLORTHEME', 'light', 3);
    INSERT INTO settings (name, value, orderIndex) VALUES ('FONT_THEME', 'default', 4);
    `;
    this.databaseService.executeQuery(async (db) => {
      await db.execute(query);
    });
  }

  down() {
    throw new Error("Method not implemented.");
  }
}
