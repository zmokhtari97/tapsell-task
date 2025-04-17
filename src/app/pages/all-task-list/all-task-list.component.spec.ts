import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskListComponent } from './all-task-list.component';

describe('MainTaskListComponent', () => {
  let component: AllTaskListComponent;
  let fixture: ComponentFixture<AllTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTaskListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
