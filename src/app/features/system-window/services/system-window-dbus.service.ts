import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class SystemWindowDbusService {
  line$$ = new Subject<Action>();

  constructor() {}
}

export interface BaseAction {
  type: string;
}

export interface ActionSetName extends BaseAction {
  payload: string;
}

export type Action = ActionSetName;
