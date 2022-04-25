import * as uuid from 'uuid';

import { Action, createReducer, on } from '@ngrx/store';

import * as Actions from './terminal.actions';

export const terminalFeatureKey = 'terminal';

export interface Session {
  id: string;
  journal: Record<number, string[]>; // date, key of unserializable session memory
  input: {
    isEnabled: boolean;
  };
}

export interface TerminalState {
  msg: {
    text: string;
    addInfo?: any;
  };
  sessions: Record<string, Session>;
}

const initialState: TerminalState = {
  msg: {
    text: 'Terminal State has been initialized',
  },
  sessions: {},
};

const reducer = createReducer(
  initialState,
  on(Actions.createSession, (state, { forId }) => {
    const newSessionId = uuid.v4();

    const newSession = {
      id: newSessionId,
      journal: {},
      input: {
        isEnabled: true,
      },
    };

    const sessions = {
      ...state.sessions,
    };

    sessions[newSessionId] = newSession;

    return {
      ...state,
      msg: {
        text: `New session has been created for ${forId}`,
        addInfo: newSessionId,
      },
      sessions,
    };
  }),
  on(Actions.echo, (state, { sessionId, pointer }) => {
    const oldSession = state.sessions[sessionId];
    const oldJournal = oldSession.journal;

    const now = Date.now();

    const newJournalEntry =
      oldJournal[now] != null ? oldJournal[now].slice() : [];

    newJournalEntry.push(pointer);

    const journal = {
      ...oldJournal,
    };

    journal[now] = newJournalEntry;

    const session: Session = {
      ...oldSession,
      journal,
    };

    const sessions = {
      ...state.sessions,
    };

    sessions[sessionId] = session;

    return {
      ...state,
      sessions,
    };
  }),
  on(Actions.echoBatch, (state, { data }) => {
    const sessions = {
      ...state.sessions,
    };

    data.forEach(({ sessionId, pointer }) => {
      const oldSession = sessions[sessionId];
      const oldJournal = oldSession.journal;
      const now = Date.now();
      const newJournalEntry =
        oldJournal[now] != null ? oldJournal[now].slice() : [];

      newJournalEntry.push(pointer);

      const journal = {
        ...oldJournal,
      };

      journal[now] = newJournalEntry;

      const session: Session = {
        ...oldSession,
        journal,
      };

      sessions[sessionId] = session;
    });

    return {
      ...state,
      sessions,
    };
  }),
  on(Actions.toggleInput, (state, { sessionId, isEnabled }) => {
    const oldSession = state.sessions[sessionId];

    const session: Session = {
      ...oldSession,
      input: {
        isEnabled,
      },
    };

    const sessions = {
      ...state.sessions,
    };

    sessions[sessionId] = session;

    return {
      ...state,
      sessions,
    };
  })
);

export const terminalReducer = (
  state: TerminalState,
  action: Action
): TerminalState => reducer(state, action);
