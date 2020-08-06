import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignToCourseComponent } from '../assign/assign-to-course/assign-to-course.component';
import { QuestionBuilderComponent } from '../question-builder/question-builder.component';

const routes: Routes = [
	{
			path: '',
			component: AssignToCourseComponent,
	},
	{
		path: 'question-builder',
		component: QuestionBuilderComponent,
	},
];

@NgModule({
	imports: [
			RouterModule.forRoot(routes)
	],
	exports: [
			RouterModule
	],
	declarations: []
})
export class AppRoutingModule { }
