import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateDetailsComponent } from './delegate-details.component';

describe('DelegateDetailsComponent', () => {
  let component: DelegateDetailsComponent;
  let fixture: ComponentFixture<DelegateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
