import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPanelComponent } from './system-panel.component';

describe('SystemPanelComponent', () => {
  let component: SystemPanelComponent;
  let fixture: ComponentFixture<SystemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
