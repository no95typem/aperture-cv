import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { TerminalStateFacade } from './terminal.facade';

@Injectable()
export class TerminalEffects {
  constructor(
    private actions$: Actions,
    private terminalSF: TerminalStateFacade
  ) {}
}
