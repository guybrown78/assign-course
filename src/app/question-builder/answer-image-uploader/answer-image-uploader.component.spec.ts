import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerImageUploaderComponent } from './answer-image-uploader.component';

describe('AnswerImageUploaderComponent', () => {
  let component: AnswerImageUploaderComponent;
  let fixture: ComponentFixture<AnswerImageUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerImageUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
