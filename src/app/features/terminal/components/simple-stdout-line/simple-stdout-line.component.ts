import { Component, Input, OnInit } from '@angular/core';
import { TerminalOutput } from '../../store/terminal.unserializable';

import * as TypingEffects from '../../helpers/typing-effects';

@Component({
  selector: 'acv-simple-stdout-line',
  templateUrl: './simple-stdout-line.component.html',
  styleUrls: ['./simple-stdout-line.component.scss'],
})
export class SimpleStdoutLineComponent implements OnInit, TerminalOutput {
  @Input() data = '';

  content = '';

  constructor() {}

  ngOnInit(): void {}

  activate() {
    return new Promise<void>((res) => {
      TypingEffects.typeLettersOneByOne(this.data).subscribe({
        next: (value) => (this.content = value),
        complete: () => res(),
      });
    });
  }

  activateInstantly() {
    this.content = this.data;
  }
}
