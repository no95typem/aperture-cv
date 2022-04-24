import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from './components';
import * as SVG from './components-svg';

const EXPORTED_ENTITIES = [
  Components.SystemPanelComponent,
  Components.SplashScreenApertureComponent,
  Components.SystemFrameComponent,
  SVG.ApertureV1Component,
];

@NgModule({
  declarations: EXPORTED_ENTITIES,
  imports: [CommonModule],
  exports: EXPORTED_ENTITIES,
})
export class SharedModule {}
