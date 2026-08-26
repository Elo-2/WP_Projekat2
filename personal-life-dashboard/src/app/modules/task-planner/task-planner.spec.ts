import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPlanner } from './task-planner';

describe('TaskPlanner', () => {
  let component: TaskPlanner;
  let fixture: ComponentFixture<TaskPlanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPlanner],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPlanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
