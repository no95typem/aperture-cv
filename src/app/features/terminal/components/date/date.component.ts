import { Component, Input, OnInit } from '@angular/core';
import { TerminalOutput } from '../../store/terminal.unserializable';

import * as TypingEffects from '../../helpers/typing-effects';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'acv-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [DatePipe],
})
export class DateComponent implements OnInit, TerminalOutput {
  static readonly FORMAT = 'YY/MM/dd HH:mm:ss';

  private activationSubscription: Subscription | null = null;

  @Input() data: any;

  content = new BehaviorSubject<string>('');

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  activate() {
    return new Promise<void>((res) => {
      this.activationSubscription = TypingEffects.typeLettersOneByOne(
        this.datePipe.transform(this.data, DateComponent.FORMAT) ?? ''
      ).subscribe({
        next: (value) => this.content.next(value),
        complete: () => res(),
      });

      this.activationSubscription.add(() => res());
    });
  }

  activateInstantly() {
    this.activationSubscription?.unsubscribe();
    this.content.next(
      this.datePipe.transform(this.data, DateComponent.FORMAT) ?? ''
    );
  }
}
