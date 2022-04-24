import { Component, Input, OnInit } from '@angular/core';

export interface ISectionLookAndFeel {
  fillColor: string;
  fillOpacity: string;
}

export interface ILookAndFeel {
  ring: ISectionLookAndFeel;
  section0: ISectionLookAndFeel;
  section1: ISectionLookAndFeel;
  section2: ISectionLookAndFeel;
  section3: ISectionLookAndFeel;
  section4: ISectionLookAndFeel;
  section5: ISectionLookAndFeel;
}

@Component({
  selector: 'acv-svg-aperture-v1',
  templateUrl: './svg-aperture-v1.component.svg',
  styleUrls: ['./svg-aperture-v1.component.scss'],
})
export class ApertureV1Component implements OnInit {
  @Input() width = '100%';
  @Input() height = '100%';

  @Input() fillColor = 'rgba(232, 161, 1, 1)';
  @Input() fillOpacity = '1';

  @Input() lookAndFeel: ILookAndFeel = {
    ring: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
    section0: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
    section1: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
    section2: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
    section3: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
    section4: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
    section5: { fillColor: this.fillColor, fillOpacity: this.fillOpacity },
  };

  constructor() {}

  ngOnInit(): void {}
}
