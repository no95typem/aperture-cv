import { SimpleStdoutLineComponent } from '../components/simple-stdout-line/simple-stdout-line.component';
import { TerminalStateFacade } from '../store/terminal.facade';
import { createUnserializedEntry } from '../store/terminal.unserializable';

export const routineKey = 'help';

export function runHelpRoutine({
  sessionId,
  terminalSF,
}: {
  sessionId: string;
  terminalSF: TerminalStateFacade;
}) {
  const componentType = SimpleStdoutLineComponent;

  const pointers = MSGS.map((msg, index) =>
    createUnserializedEntry({
      componentType,
      sessionId,
      data: msg,
      endRoutine: index === MSGS.length - 1 ? routineKey : undefined,
    })
  );

  const data = pointers.map((pointer) => {
    return {
      sessionId,
      pointer,
    };
  });

  terminalSF.echoBatch(data);
}

const MSGS = [
  'Welcome, guest!',
  'You are able to run these commands:',
  '- help',
  '- personnel',
];
