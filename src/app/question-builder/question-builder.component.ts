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
	answers:any[] = []


  constructor(fb: FormBuilder) {
		this.loForm = fb.group({ 
			learningObjective: ['', Validators.required]
		});
		
		this.qtForm = fb.group({ 
			questionTitle: ['', Validators.required]
		});

		const defaultAnswerCount = 4;
		for(let i = 0; i < defaultAnswerCount; i++) {
				this.onAddNewAnswer();
		}

	}

  ngOnInit() {
		
  }

	get learningObjective() { return this.loForm.get('learningObjective'); }
	get questionTitle() { return this.qtForm.get('questionTitle'); }

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
		console.log(this.qtForm)
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

	changeIsCorrectAnswer(event){
		const { index } = event;
		// loop through all the answers setting the isCorrectAnswer flag according to the index of the one that has just been selected.
		// only one is to be set so it turns off all the others
		this.answers.map((a,i) => {
			a.isCorrectAnswer = i === index ? true : false;
		});
	}

	removeAnswer(index){
		// remove that index entry from the array
		this.answers.splice(index, 1);
	}

	updateAnswerTitle(event, index){
		// set the title fot the answer from it's index in the array
		this.answers[index].title = event.detail.value
	}

	onAddNewAnswer(){
		this.answers.push(
			{
				title:"",
				isCorrectAnswer:false,
				imageName:""
			}
		)
	}
}
