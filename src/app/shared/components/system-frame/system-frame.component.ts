import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'acv-system-frame',
  templateUrl: './system-frame.component.html',
  styleUrls: ['./system-frame.component.scss'],
})
export class SystemFrameComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
