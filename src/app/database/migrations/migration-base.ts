import { Injectable } from "@angular/core";

export abstract class MigrationBase {
  abstract up();
  abstract down();
}
