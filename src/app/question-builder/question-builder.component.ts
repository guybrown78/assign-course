import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent implements OnInit {

	questions:any[] = []
	allQuestionsValid:boolean = false;
	currentIndex:number = 0;
	cancelConfirmationOpened:boolean = false;
	saveConfirmationOpened:boolean = false;
  constructor() {
		this.addNewQuestion()
	}

  ngOnInit() {
		
  }

	editQuestion(index){
		// remove that index entry from the array
		this.currentIndex = index;
	}

	addNewQuestion(){
		this.questions.push(
			{
				title:"",
				learningObjective:"",
				answers:[],
				isValid:false,
			}
		)
		this.currentIndex = this.questions.length - 1;
		this.checkValidation();
	}
	removeQuestion(index){
		// remove that index entry from the array
		this.questions.splice(index, 1);
		this.checkValidation();
	}

	updateQuestionDetails(details, index){
		this.questions[index].title = details.title;
		this.questions[index].learningObjective = details.learningObjective;
		this.questions[index].answers = [ ...details.answers ]
		this.questions[index].isValid = details.isValid;
		this.checkValidation();
	}

	checkValidation(){
		const vq = this.questions.filter(q => q.isValid);
		this.allQuestionsValid = vq.length === this.questions.length;
	}
	saveQuestions(){
		console.log(this.questions);
		// TODO
		this.saveConfirmationOpened = true;
	}

	cancel(){
		this.cancelConfirmationOpened = true;
	}

	tfModalConfirmedHandler(event){
		// user wants to cansel, 
		// TODO
		this.cancelConfirmationOpened = false;
	}
	tfModalClosedHandler(event){
		// user has decided not to cancel
		this.cancelConfirmationOpened = false;
	}


	modalSaveClosedHandler(event){
		console.log("save closed")
		this.saveConfirmationOpened = false;
	}
	modalSaveConfirmedHandler(event){
		console.log("save confirmed");
		this.saveConfirmationOpened = false;
	}
}
