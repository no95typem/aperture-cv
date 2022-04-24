import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SystemWindowDbusService } from '../../services/system-window-dbus.service';

@Component({
  selector: 'acv-system-window',
  templateUrl: './system-window.component.html',
  styleUrls: ['./system-window.component.scss'],
})
export class SystemWindowComponent implements OnInit {
  @Input() @HostBinding('style.width') width = '100%';
  @Input() @HostBinding('style.height') height = '100%';

  windowTitle: string = 'Window';

  constructor(private selfDbus: SystemWindowDbusService) {}

  ngOnInit(): void {
    this.selfDbus.line$$.subscribe((action) => {
      switch (action.type) {
        case 'set name':
          this.windowTitle = action.payload;
          break;
        default:
          break;
      }
    });
  }
}
