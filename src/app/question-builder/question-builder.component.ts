import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent implements OnInit {

	questions:any[] = []


  constructor() {
		this.addNewQuestion()
	}

  ngOnInit() {
		
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
	}
	removeQuestion(index){
		// remove that index entry from the array
		this.questions.splice(index, 1);
	}

	updateQuestionDetails(details, index){
		this.questions[index].title = details.title;
		this.questions[index].learningObjective = details.learningObjective;
		this.questions[index].answers = [ ...details.answers ]
		this.questions[index].isValid = details.isValid;
	}
}
