import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFrameComponent } from './system-frame.component';

describe('SystemFrameComponent', () => {
  let component: SystemFrameComponent;
  let fixture: ComponentFixture<SystemFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
