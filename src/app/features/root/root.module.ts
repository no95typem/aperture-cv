import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TerminalModule } from '../terminal/terminal.module';
import { SystemWindowModule } from '../system-window/system-window.module';

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, SharedModule, TerminalModule, SystemWindowModule],
  exports: [RootComponent],
})
export class RootModule {}
