import { Component, Input, OnInit } from '@angular/core';
import { TerminalOutput } from '../../store/terminal.unserializable';

import * as TypingEffects from '../../helpers/typing-effects';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'acv-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [DatePipe],
})
export class DateComponent implements OnInit, TerminalOutput {
  static readonly FORMAT = 'YY/MM/dd HH:mm:ss';

  @Input() data: any;

  content: string = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  activate() {
    return new Promise<void>((res) => {
      TypingEffects.typeLettersOneByOne(
        this.datePipe.transform(this.data, DateComponent.FORMAT) ?? ''
      ).subscribe({
        next: (value) => (this.content = value),
        complete: () => res(),
      });
    });
  }

  activateInstantly() {
    this.content =
      this.datePipe.transform(this.data, DateComponent.FORMAT) ?? '';
  }
}
