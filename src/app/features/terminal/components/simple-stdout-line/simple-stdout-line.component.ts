import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TerminalOutput } from '../../store/terminal.unserializable';

import * as TypingEffects from '../../helpers/typing-effects';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'acv-simple-stdout-line',
  templateUrl: './simple-stdout-line.component.html',
  styleUrls: ['./simple-stdout-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStdoutLineComponent implements OnInit, TerminalOutput {
  private activationSubscription: Subscription | null = null;

  @Input() data = '';

  content = new BehaviorSubject<string>('');

  constructor() {}

  ngOnInit(): void {}

  activate() {
    return new Promise<void>((res) => {
      this.activationSubscription = TypingEffects.typeLettersOneByOne(
        this.data
      ).subscribe({
        next: (value) => this.content.next(value),
        complete: () => res(),
      });

      this.activationSubscription.add(() => res());
    });
  }

  activateInstantly() {
    this.activationSubscription?.unsubscribe();
    this.content.next(this.data);
  }
}
