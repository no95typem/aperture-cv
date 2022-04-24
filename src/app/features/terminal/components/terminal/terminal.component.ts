import * as uuid from 'uuid';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  Optional,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SystemWindowDbusService } from 'src/app/features/system-window/services/system-window-dbus.service';
import {
  TerminalOutput,
  TERMINAL_SESSIONS_UNSERIALIZED_MEMORY,
} from '../../store/terminal.unserializable';
import { DateComponent } from '../date/date.component';
import { TerminalSessionService } from '../../services/terminal-session.service';
import { Session } from '../../store/terminal.reducer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'acv-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  providers: [TerminalSessionService],
})
export class TerminalComponent implements OnInit, AfterViewInit {
  private selfId = uuid.v4();

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  @ViewChild('textarea') textarea: ElementRef | null = null;

  private memory: Record<
    number,
    {
      isActivated: boolean;
      uuid: string;
      componentRef?: ComponentRef<TerminalOutput>;
      componentType: Type<TerminalOutput>;
      data?: any;
      stdin?: true;
    }[]
  > = {};

  private activatingInProcess$$ = new BehaviorSubject<boolean>(false);

  activatingInProcess: boolean = false;

  isInputEnabled: boolean = true;

  now: number = Date.now();

  constructor(
    @Optional() private swDbus: SystemWindowDbusService,
    private terminalSS: TerminalSessionService
  ) {
    this.activatingInProcess$$.subscribe((val) => {
      this.activatingInProcess = val;
    });

    setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sendSelfInfo();

    this.watchSession();

    this.terminalSS
      .setId(this.selfId)
      .setActivationListener(this.activatingInProcess$$.asObservable())
      .createSession();
  }

  private sendSelfInfo() {
    this.swDbus?.line$$.next({
      type: 'set name',
      payload: 'Aperture Labs TTY v0.0.1α ',
    });
  }

  private watchSession() {
    this.terminalSS.getSession().subscribe((session) => {
      if (session != null) {
        this.terminalSS.start();
        this.isInputEnabled = session.input.isEnabled;
        this.redraw(session);
      }
    });
  }

  private redraw(session: Session) {
    const unserializedGlobalMemory =
      TERMINAL_SESSIONS_UNSERIALIZED_MEMORY[session.id];

    Object.entries(session.journal).reduce((memory, [dateAsStr, pointers]) => {
      const date = +dateAsStr;

      pointers.forEach((pointer) => {
        const { componentType, data, stdin } =
          unserializedGlobalMemory[pointer];

        if (memory[date] == null) {
          memory[date] = [];
        }

        if (memory[date].every((rec) => rec.uuid !== pointer)) {
          memory[date].push({
            isActivated: false,
            uuid: `date-for-${pointer}`,
            componentType: DateComponent,
            data: date,
            stdin,
          });
          memory[date].push({
            isActivated: false,
            uuid: pointer,
            componentType,
            data,
            stdin,
          });
        }
      });

      return memory;
    }, this.memory);

    setTimeout(() => {
      this.activate();
    });
  }

  stdin($event: any) {
    if ($event.key === 'Enter') {
      this.terminalSS.stdin($event.target.value);
    }
  }

  private activate(selfCall = false) {
    if (!selfCall && this.activatingInProcess$$.value) {
      return;
    }

    this.activatingInProcess$$.next(true);

    const nextMemoryEntry = Object.entries(this.memory).find(
      ([date, entries]) => entries.some((entry) => !entry.isActivated)
    );

    if (nextMemoryEntry == null) {
      this.activatingInProcess$$.next(false);
      setTimeout(() => {
        this.textarea?.nativeElement.focus();
      }, 5);
      return;
    }

    const theNextEntryToActivate = nextMemoryEntry[1].find(
      (entry) => !entry.isActivated
    );

    if (theNextEntryToActivate == null) {
      this.activatingInProcess$$.next(false);
      setTimeout(() => {
        this.textarea?.nativeElement.focus();
      }, 5);
      return;
    }

    theNextEntryToActivate.componentRef = this.container.createComponent(
      theNextEntryToActivate.componentType
    );

    if (theNextEntryToActivate.data != null) {
      theNextEntryToActivate.componentRef.instance.data =
        theNextEntryToActivate.data;
    }

    if (theNextEntryToActivate.stdin) {
      theNextEntryToActivate.componentRef.instance.activateInstantly();
      theNextEntryToActivate.isActivated = true;
      this.activate(true);
    } else {
      theNextEntryToActivate.componentRef.instance.activate().then(() => {
        theNextEntryToActivate.isActivated = true;
        this.activate(true);
      });
    }
  }
}
