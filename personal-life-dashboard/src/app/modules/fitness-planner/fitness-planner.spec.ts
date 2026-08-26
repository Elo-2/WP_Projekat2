import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessPlanner } from './fitness-planner';

describe('FitnessPlanner', () => {
  let component: FitnessPlanner;
  let fixture: ComponentFixture<FitnessPlanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessPlanner],
    }).compileComponents();

    fixture = TestBed.createComponent(FitnessPlanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
