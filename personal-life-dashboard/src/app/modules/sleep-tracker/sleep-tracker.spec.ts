import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTracker } from './sleep-tracker';

describe('SleepTracker', () => {
  let component: SleepTracker;
  let fixture: ComponentFixture<SleepTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepTracker],
    }).compileComponents();

    fixture = TestBed.createComponent(SleepTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
