import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemWindowComponent } from './system-window.component';

describe('SystemWindowComponent', () => {
  let component: SystemWindowComponent;
  let fixture: ComponentFixture<SystemWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
