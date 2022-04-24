import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreenApertureComponent } from './splash-screen-aperture.component';

describe('SplashScreenApertureComponent', () => {
  let component: SplashScreenApertureComponent;
  let fixture: ComponentFixture<SplashScreenApertureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashScreenApertureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenApertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
