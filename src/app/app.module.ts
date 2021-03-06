import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TfNgFormComponentsModule } from 'tf-ng-form-components'
import { AppRoutingModule } from './app-routing/app-routing.module';
//
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { AssignToCourseComponent } from './assign/assign-to-course/assign-to-course.component';
import { DelegateDetailsComponent } from './assign/delegate-details/delegate-details.component';
import { QuestionBuilderComponent } from './question-builder/question-builder.component';
import { AnswerDetailsComponent } from './question-builder/answer-details/answer-details.component';
import { QuestionDetailsComponent } from './question-builder/question-details/question-details.component';
import { StepQuickAddComponent } from './question-builder/step-quick-add/step-quick-add.component';
import { AnswerImageUploaderComponent } from './question-builder/answer-image-uploader/answer-image-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    AssignCourseComponent,
    AssignToCourseComponent,
    DelegateDetailsComponent,
    QuestionBuilderComponent,
    AnswerDetailsComponent,
    QuestionDetailsComponent,
    StepQuickAddComponent,
    AnswerImageUploaderComponent
  ],
  imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		TfNgFormComponentsModule,
		AppRoutingModule
  ],
  providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
