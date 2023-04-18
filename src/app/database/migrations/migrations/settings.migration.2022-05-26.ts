import { DatabaseService } from "../../services/database.service";
import { MigrationBase } from "../migration-base";

export class settings_migration_2022_05_26 extends MigrationBase {
  constructor(private databaseService: DatabaseService) {
    super();
  }
  async up() {
    var query = `
    INSERT INTO settings (name, value, orderIndex) VALUES ('COLOR_THEME', 'default', 1);
    INSERT INTO settings (name, value, orderIndex) VALUES ('FONT_THEME', 'sans-serif', 2);
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_SCROLL_TO_TOP', 'true', 3);
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_SHOW_MISSION_COMPLETED_COLOR', 'true', 4);
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_ALERT_DELETE_MISSION', 'true', 5);
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_ALERT_DELETE_COUNTER', 'true', 6);
    INSERT INTO settings (name, value, orderIndex) VALUES ('SHOULD_STRIKE_COMPLETED_MISSION', 'true', 7);

    `;
    this.databaseService.executeQuery(async (db) => {
      await db.execute(query);
    });
  }

  down() {
    throw new Error("Method not implemented.");
  }
}
