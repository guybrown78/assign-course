import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepQuickAddComponent } from './step-quick-add.component';

describe('StepQuickAddComponent', () => {
  let component: StepQuickAddComponent;
  let fixture: ComponentFixture<StepQuickAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepQuickAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepQuickAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
