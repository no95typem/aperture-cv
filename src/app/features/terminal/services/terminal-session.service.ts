import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SimpleStdoutLineComponent } from '../components/simple-stdout-line/simple-stdout-line.component';
import { routineKey as helpRoutineKey, runHelpRoutine } from '../routines/help';
import {
  routineKey as personnelRoutineKey,
  runPersonnelRoutine,
} from '../routines/personnel';
import { TerminalStateFacade } from '../store/terminal.facade';
import { Session } from '../store/terminal.reducer';
import {
  createUnserializedEntry,
  TERMINAL_SESSIONS_UNSERIALIZED_MEMORY,
} from '../store/terminal.unserializable';

@Injectable({
  providedIn: null,
})
export class TerminalSessionService {
  private selfId: string | null = null;
  private createdForMeMsgTemplate: string | null = null;
  private session$$ = new BehaviorSubject<Session | null>(null);
  private session$ = this.session$$.asObservable();
  private isRunning = false;
  private isActivatingInProcess = new BehaviorSubject(true);
  private runningRoutines: string[] = [];

  constructor(private terminalSF: TerminalStateFacade) {}

  setId(id: string) {
    this.selfId = id;
    this.createdForMeMsgTemplate = `New session created for ${this.selfId}`;
    this.watchTerminalDbus();
    return this;
  }

  setActivationListener(observable$: Observable<boolean>) {
    observable$.subscribe(this.isActivatingInProcess);
    return this;
  }

  createSession() {
    if (!this.selfId) {
      throw new Error('ID is not set');
    }

    this.terminalSF.createSession(this.selfId);

    return this;
  }

  start() {
    if (this.session$$.value == null) {
      throw new Error('There is no session');
    }

    if (Object.entries(this.session$$.value.journal).length === 0) {
      const componentType = SimpleStdoutLineComponent;

      const sessionId = this.session$$.value!.id;

      const pointers = START_MSGS.map((msg) =>
        createUnserializedEntry({
          componentType,
          sessionId,
          data: msg,
        })
      );

      const data = pointers.map((pointer) => {
        return {
          sessionId,
          pointer,
        };
      });

      this.terminalSF.echoBatch(data);
    }

    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    this.session$$.subscribe((session) => {
      if (session != null) {
        const entries = Object.entries(session.journal);
        const lastDateEntry = entries[entries.length - 1];
        const theLastPointer = lastDateEntry?.[1][lastDateEntry[1].length - 1];

        if (theLastPointer == null) {
          return;
        }

        const unserializedGlobalMemory =
          TERMINAL_SESSIONS_UNSERIALIZED_MEMORY[session.id];

        const { stdin, endRoutine, data } =
          unserializedGlobalMemory[theLastPointer];

        if (stdin) {
          this.handleStdin(data);
        } else if (endRoutine != null) {
          this.endRoutine(endRoutine);
        }
      }
    });
  }

  getSession() {
    return this.session$;
  }

  stdin(val: string) {
    this.terminalSF.toggleInput({
      sessionId: this.session$$.value!.id,
      isEnabled: false,
    });

    const componentType = SimpleStdoutLineComponent;

    const pointer = createUnserializedEntry({
      componentType,
      sessionId: this.session$$.value!.id,
      data: `> ${val}`,
      stdin: true,
    });

    this.terminalSF.echo({
      sessionId: this.session$$.value?.id!,
      pointer,
    });
  }

  private endRoutine(routineName: string) {
    const startLength = this.runningRoutines.length;

    this.runningRoutines = this.runningRoutines.filter(
      (routine) => routine != routineName
    );

    if (startLength === this.runningRoutines.length) {
      return;
    }

    if (this.runningRoutines.length === 0) {
      this.terminalSF.toggleInput({
        sessionId: this.session$$.value!.id,
        isEnabled: true,
      });
    }
  }

  private helpUser() {
    setTimeout(() => {
      this.stdin('personnel profile show Maksim Kapalin');
    });
  }

  private handleStdin(val: string) {
    const command = val.split(' ');
    switch (command[1]) {
      case 'help':
        runHelpRoutine({
          sessionId: this.session$$.value!.id,
          terminalSF: this.terminalSF,
        });
        this.runningRoutines.push(helpRoutineKey);
        break;
      case 'personnel':
        runPersonnelRoutine({
          sessionId: this.session$$.value!.id,
          terminalSF: this.terminalSF,
          args: command.slice(2, command.length),
        });
        this.runningRoutines.push(personnelRoutineKey);
        break;
      default:
        this.runErrorRoutine(command);
        break;
    }
  }

  private runErrorRoutine(command: string[]) {
    const routineKey = 'ErrorRoutine';
    this.runningRoutines.push(routineKey);

    const msgs = [
      `Error! The command is not recognized: ${command
        .slice(0, 2)
        .join(' ')}, please use "help"`,
    ];

    const unserializedMemory =
      TERMINAL_SESSIONS_UNSERIALIZED_MEMORY[this.session$$.value!.id];
    const isProfileShown = Object.keys(this.session$$.value!.journal).some(
      (key) => unserializedMemory[key]?.data?.lastname === 'Kapalin'
    );

    if (!isProfileShown) {
      msgs.push('Gentleman module activated: execute the default command...');
      setTimeout(() => {
        this.helpUser();
      });
    }

    const componentType = SimpleStdoutLineComponent;

    const pointers = msgs.map((msg, index) =>
      createUnserializedEntry({
        componentType,
        sessionId: this.session$$.value!.id,
        data: msg,
        endRoutine: index === msgs.length - 1 ? routineKey : undefined,
      })
    );

    const data = pointers.map((pointer) => {
      return {
        sessionId: this.session$$.value!.id,
        pointer,
      };
    });

    this.terminalSF.echoBatch(data);
  }

  private watchTerminalDbus() {
    this.terminalSF.msg$.subscribe((msg) => {
      if (
        this.createdForMeMsgTemplate != null &&
        msg.text.startsWith(this.createdForMeMsgTemplate)
      ) {
        if (this.session$$.value != null) {
          return;
        }

        this.terminalSF
          .connectToSession(msg.addInfo!)
          ?.subscribe(this.session$$);
      }
    });
  }
}

const START_MSGS = [
  'System startup initialized...',
  'System startup is succesfully complete.',
  `Enter the next command, or use 'help' to get a list of available commands.`,
];
