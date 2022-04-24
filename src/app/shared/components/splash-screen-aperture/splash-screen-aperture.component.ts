import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'acv-splash-screen-aperture',
  templateUrl: './splash-screen-aperture.component.html',
  styleUrls: ['./splash-screen-aperture.component.scss'],
})
export class SplashScreenApertureComponent implements OnInit, OnDestroy {
  static readonly SECTION_PROGRES = 100 / 6;

  @Input() $$progress!: BehaviorSubject<number>;
  @Input() fillColor = 'rgba(232, 161, 1, 1)';
  @Input() startFillOpacity = '0.3';

  lookAndFeel = {
    ring: { fillColor: this.fillColor, fillOpacity: '0' },
    section0: { fillColor: this.fillColor, fillOpacity: this.startFillOpacity },
    section1: { fillColor: this.fillColor, fillOpacity: this.startFillOpacity },
    section2: { fillColor: this.fillColor, fillOpacity: this.startFillOpacity },
    section3: { fillColor: this.fillColor, fillOpacity: this.startFillOpacity },
    section4: { fillColor: this.fillColor, fillOpacity: this.startFillOpacity },
    section5: { fillColor: this.fillColor, fillOpacity: this.startFillOpacity },
  };

  private subs: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    const sub = this.$$progress.subscribe((progress) => {
      const activeSections =
        progress / SplashScreenApertureComponent.SECTION_PROGRES;

      for (let i = 0; i < activeSections; i++) {
        this.lookAndFeel[
          `section${i}` as keyof typeof this.lookAndFeel
        ].fillOpacity = '1';
      }
    });

    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
