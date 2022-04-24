import { createFeatureSelector, createSelector } from '@ngrx/store';
import { terminalFeatureKey, TerminalState } from './terminal.reducer';

const getTerminalState =
  createFeatureSelector<TerminalState>(terminalFeatureKey);

export const selectSessions = createSelector(
  getTerminalState,
  (state: TerminalState) => state.sessions
);

export const selectMsg = createSelector(
  getTerminalState,
  (state: TerminalState) => state.msg
);
