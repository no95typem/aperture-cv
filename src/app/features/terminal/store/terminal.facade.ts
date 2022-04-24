import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, takeWhile } from 'rxjs';
import { Session, TerminalState } from './terminal.reducer';
import { selectMsg, selectSessions } from './terminal.selectors';

import * as Actions from './terminal.actions';

@Injectable({
  providedIn: null,
})
export class TerminalStateFacade {
  private currSessions: Record<string, Session> = {};

  sessions$: Observable<Record<string, Session>>;
  msg$: Observable<TerminalState['msg']>;

  constructor(private store: Store<TerminalState>) {
    this.sessions$ = store.pipe(select(selectSessions));
    this.sessions$.subscribe((sessions) => {
      this.currSessions = sessions;
    });

    this.msg$ = store.pipe(select(selectMsg));
  }

  getCurrentSessions() {
    return this.currSessions;
  }

  createSession(forId: string) {
    this.store.dispatch(Actions.createSession({ forId }));
  }

  connectToSession(id: string) {
    if (!(id in this.currSessions)) {
      return null;
    }

    return this.sessions$.pipe(
      takeWhile((sessions) => id in sessions),
      map((sessions) => sessions[id])
    );
  }

  echo({ sessionId, pointer }: { sessionId: string; pointer: string }) {
    this.store.dispatch(Actions.echo({ sessionId, pointer }));
  }

  echoBatch(data: { sessionId: string; pointer: string }[]) {
    this.store.dispatch(Actions.echoBatch({ data }));
  }

  toggleInput({
    sessionId,
    isEnabled,
  }: {
    sessionId: string;
    isEnabled: boolean;
  }) {
    this.store.dispatch(Actions.toggleInput({ sessionId, isEnabled }));
  }
}
