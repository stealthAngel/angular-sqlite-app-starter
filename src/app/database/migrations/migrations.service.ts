import { Injectable } from "@angular/core";
import { Migration_DB } from "../models/database-models";
import { MigrationRepository } from "../repositories/migration.repository";
import { DatabaseService } from "../services/database.service";
import { FirstMigration } from "./initial-migrations/first.migration";
import { MigrationBase } from "./migration-base";
import { settings_migration_2022_05_26 } from "./migrations/settings.migration.2022-05-26";
import { startup_migration_2022_05_26 } from "./migrations/startup.migration.2022-05-26";
//static is internal saved in the class
//to add migrations add them to the migrations array
interface StaticMigration {
  name: string;
  id: number;
  migration: MigrationBase;
}
@Injectable()
export class MigrationService {
  constructor(private migrationRepository: MigrationRepository, private databaseService: DatabaseService) {}

  async executeMigrations(): Promise<any> {
    //first we need a migration table to store the migrations
    var firstMigration = new FirstMigration(this.databaseService);
    await firstMigration.up();

    //get the latest migration from the database
    var latestMigration = await this.migrationRepository.getLastMigration();

    //get the remaining migrations to execute
    var remaining = this.getRemainingMigrationsToExecute(latestMigration?.id ?? 0);
    remaining.forEach((m) => {
      m.migration.up();
      this.migrationRepository.insert({ id: m.id, name: m.name } as Migration_DB);
    });
  }

  getRemainingMigrationsToExecute(latestMigrationIdFromDatabase: number): StaticMigration[] {
    var migrations = this.getStaticMigrations();
    var index = migrations.findIndex((m) => m.id == latestMigrationIdFromDatabase);
    return migrations.slice(index + 1);
  }

  getStaticMigrations(): StaticMigration[] {
    var migrations = [new startup_migration_2022_05_26(this.databaseService), new settings_migration_2022_05_26(this.databaseService)];

    return migrations.map((m, i) => {
      return {
        name: m.constructor.name,
        id: i + 1,
        migration: m,
      };
    });
  }
}
