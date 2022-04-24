import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemWindowComponent } from './components/system-window/system-window.component';
import { SystemWindowDbusService } from './services/system-window-dbus.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SystemWindowComponent],
  imports: [CommonModule, SharedModule],
  providers: [SystemWindowDbusService],
  exports: [SystemWindowComponent],
})
export class SystemWindowModule {}
