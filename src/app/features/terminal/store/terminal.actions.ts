import { createAction, props } from '@ngrx/store';

export const createSession = createAction(
  'createSession',
  props<{ forId: string }>()
);

export const echo = createAction(
  'echo',
  props<{ sessionId: string; pointer: string }>()
);

export const echoBatch = createAction(
  'echoBatch',
  props<{ data: { sessionId: string; pointer: string }[] }>()
);

export const toggleInput = createAction(
  'toggleInput',
  props<{ sessionId: string; isEnabled: boolean }>()
);
