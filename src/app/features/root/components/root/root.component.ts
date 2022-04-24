import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'acv-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  loadingProgress = new BehaviorSubject(0);

  isTermLoaded = false;

  constructor() {}

  ngOnInit(): void {
    this.loadTerminal();
  }

  private loadTerminal() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      this.loadingProgress.next(progress);
      if (progress >= 100) {
        clearInterval(interval);
        this.loadingProgress.complete();
        this.isTermLoaded = true;
      }
    }, 20);
  }
}
