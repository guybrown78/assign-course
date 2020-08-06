import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent implements OnInit {
	// Added currentStep. 
	// 1 = select question learnng objective
	// 2 = question title
	// 3 = answers
	currentStep:number = 1;
	//
	loForm: FormGroup;
	loDisabled: boolean = false;
	loSubmitted: boolean = false;
	//
	qtForm: FormGroup;
	qtDisabled: boolean = true;
	qtSubmitted: boolean = false;
	//
	answers:any[] = [
		{
			title:"",
			isCorrectAnswer:false,
			imageName:""
		},
		{
			title:"",
			isCorrectAnswer:false,
			imageName:""
		},
		{
			title:"",
			isCorrectAnswer:false,
			imageName:""
		},
		{
			title:"",
			isCorrectAnswer:false,
			imageName:""
		},
	]


  constructor(fb: FormBuilder) {
		this.loForm = fb.group({ 
			learningObjective: ['', Validators.required]
		});
		
		this.qtForm = fb.group({ 
			questionTitle: ['', Validators.required]
		});
	}

  ngOnInit() {
  }

	get learningObjective() { return this.loForm.get('learningObjective'); }
	get questionTitle() { return this.qtForm.get('questionTitle'); }



		// onKeyPress(event){
		// 	console.log(event)
		// 	if (event.keyCode === 13) {
		// 		// Cancel the default action, if needed
		// 		event.preventDefault();
		// 		console.log(event)
		// 		// Trigger the button element with a click
		// 		// document.getElementById("myBtn").click();
		// 	}
		// }

	onLOSubmit(){
		if(this.currentStep === 1 && !this.loSubmitted){
			// set lo params
			this.loDisabled = true;
			this.loSubmitted = true;
			// initiate next step
			this.currentStep = 2;
			this.qtDisabled = false;
			return;
		}
		// loForm has previously been submitted, toggle the disabled state
		this.loDisabled = !this.loDisabled;	
	}

	onQTSubmit(){
		if(this.currentStep === 2 && !this.qtSubmitted){
			// set lo params
			this.qtDisabled = true;
			this.qtSubmitted = true;
			// initiate next step
			this.currentStep = 3;
			// this.qtDisabled = false;
			return;
		}
		// qtForm has previously been submitted, toggle the disabled state
		this.qtDisabled = !this.qtDisabled;	
	}

	removeAnswer(event){
		console.log("removeAnswer")
		console.log(event)
	}

	updateAnserTitle(event){
		console.log("updateAnserTitle")
		console.log(event)
	}
}
