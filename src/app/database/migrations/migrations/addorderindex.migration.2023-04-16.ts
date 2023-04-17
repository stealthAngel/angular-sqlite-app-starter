import { Injectable } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { MigrationBase } from "../migration-base";

export class addorderindex_migration_2023_04_16 extends MigrationBase {
  constructor(private database: DatabaseService) {
    super();
  }

  async up() {
    this.database.executeQuery(async (db) => {
      await db.execute(updateSchema);
    });
  }

  down() {
    throw new Error("Method not implemented.");
  }
}

const updateSchema: string = `
ALTER TABLE missions ADD COLUMN orderIndex INTEGER NOT NULL DEFAULT 0;
ALTER TABLE categories ADD COLUMN orderIndex INTEGER NOT NULL DEFAULT 0;

`;
