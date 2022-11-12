import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

@Injectable()
export abstract class DatabaseService {
  abstract executeQuery<T>(callback: myCallbackType<T>): Promise<T>;
}

export interface myCallbackType<T> {
  (myArgument: SQLiteDBConnection): T;
}
