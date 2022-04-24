import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { TerminalComponent } from './components/terminal/terminal.component';
import { SystemWindowModule } from '../system-window/system-window.module';
import { TerminalStateFacade } from './store/terminal.facade';
import { StoreModule } from '@ngrx/store';
import { terminalFeatureKey, terminalReducer } from './store/terminal.reducer';
import { TerminalEffects } from './store/terminal.effects';
import { EffectsModule } from '@ngrx/effects';
import { SimpleStdoutLineComponent } from './components/simple-stdout-line/simple-stdout-line.component';
import { DateComponent } from './components/date/date.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    TerminalComponent,
    SimpleStdoutLineComponent,
    DateComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SystemWindowModule,
    StoreModule.forFeature(terminalFeatureKey, terminalReducer),
    EffectsModule.forFeature([TerminalEffects]),
    LayoutModule,
  ],
  exports: [TerminalComponent],
  providers: [TerminalStateFacade],
})
export class TerminalModule {}
