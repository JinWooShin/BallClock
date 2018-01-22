import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallClockComponent } from './ball-clock.component';

describe('BallClockComponent', () => {
  let component: BallClockComponent;
  let fixture: ComponentFixture<BallClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
