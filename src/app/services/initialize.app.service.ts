import { SQLiteService } from "../database/services/sqlite.service";

import { Injectable } from "@angular/core";
import { MigrationService } from "../database/migrations/migrations.service";

@Injectable()
export class InitializeAppService {
  constructor(private sqliteService: SQLiteService, private migrationService: MigrationService) {}

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      try {
        //execute startup queries
        await this.migrationService.executeMigrations();
        console.log("executeMigrations done");
      } catch (error) {
        throw Error(`initializeAppError: ${error}`);
      }
    });
  }
}
