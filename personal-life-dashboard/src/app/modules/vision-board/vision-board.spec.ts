import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionBoard } from './vision-board';

describe('VisionBoard', () => {
  let component: VisionBoard;
  let fixture: ComponentFixture<VisionBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(VisionBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
