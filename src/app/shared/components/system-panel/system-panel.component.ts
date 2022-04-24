import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'acv-system-panel',
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss'],
})
export class SystemPanelComponent implements OnInit {
  @Input() style: {
    [klass: string]: any;
  } | null = null;

  constructor() {}

  ngOnInit(): void {}
}
