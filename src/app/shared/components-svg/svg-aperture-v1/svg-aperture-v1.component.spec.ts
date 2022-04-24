import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApertureV1Component } from './svg-aperture-v1.component';

describe('ApertureV1Component', () => {
  let component: ApertureV1Component;
  let fixture: ComponentFixture<ApertureV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApertureV1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApertureV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
