import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TfNgFormComponentsModule } from 'tf-ng-form-components'
//
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { AssignToCourseComponent } from './assign/assign-to-course/assign-to-course.component';
import { DelegateDetailsComponent } from './assign/delegate-details/delegate-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    AssignCourseComponent,
    AssignToCourseComponent,
    DelegateDetailsComponent
  ],
  imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		TfNgFormComponentsModule
  ],
  providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
