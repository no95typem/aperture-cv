import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleStdoutLineComponent } from './simple-stdout-line.component';

describe('SimpleStdoutLineComponent', () => {
  let component: SimpleStdoutLineComponent;
  let fixture: ComponentFixture<SimpleStdoutLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleStdoutLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStdoutLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
