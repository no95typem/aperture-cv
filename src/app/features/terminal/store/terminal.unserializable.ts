import * as uuid from 'uuid';

import { Type } from '@angular/core';

export interface TerminalOutput {
  activate: () => Promise<void>;
  activateInstantly: () => void;
  data: any;
}

export const TERMINAL_SESSIONS_UNSERIALIZED_MEMORY: Record<
  string,
  Record<
    string,
    {
      componentType: Type<TerminalOutput>;
      data: any;
      stdin?: true;
      endRoutine?: string;
    }
  >
> = {};

export function createUnserializedEntry({
  data,
  componentType,
  sessionId,
  stdin,
  endRoutine,
}: {
  data: any;
  componentType: Type<TerminalOutput>;
  sessionId: string;
  stdin?: true;
  endRoutine?: string;
}) {
  const pointer = uuid.v4();

  let sessionMemory = TERMINAL_SESSIONS_UNSERIALIZED_MEMORY[sessionId];

  if (sessionMemory == null) {
    TERMINAL_SESSIONS_UNSERIALIZED_MEMORY[sessionId] = {};
    sessionMemory = TERMINAL_SESSIONS_UNSERIALIZED_MEMORY[sessionId];
  }

  sessionMemory[pointer] = {
    componentType,
    data,
    stdin,
    endRoutine,
  };

  return pointer;
}
