import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlanner } from './study-planner';

describe('StudyPlanner', () => {
  let component: StudyPlanner;
  let fixture: ComponentFixture<StudyPlanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyPlanner],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyPlanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
