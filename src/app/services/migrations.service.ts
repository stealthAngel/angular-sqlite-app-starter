import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Migration_2022_05_26 } from '../migrations/Migration_2022_05_26';
import { Migration_AppSettings_2022_05_26 } from '../migrations/Migration_AppSettings_2022_05_26';
import { DatabaseService } from './database.service';
import { SQLiteService } from './sqlite.service';

@Injectable()
export class MigrationService {

  constructor(private migration_2022_05_26: Migration_2022_05_26, private migration_AppSettings_2022_05_26: Migration_AppSettings_2022_05_26) {
  }


  async migrate(): Promise<any> {
    await this.migration_2022_05_26.migrate();
    await this.migration_AppSettings_2022_05_26.migrate();
  }

  async seed(): Promise<any> {
  }
}
