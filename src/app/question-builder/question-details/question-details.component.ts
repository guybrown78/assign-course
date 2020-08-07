import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
	@Input ('index') index:number;
	@Input ('isOpen') isOpen:boolean = false;
	@Output('questionDetails') questionDetails = new EventEmitter();
	@Output('removeQuestion') removeQuestion = new EventEmitter();
	@Output('editQuestion') editQuestion = new EventEmitter();
	// currentStep. 
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
			this.setQuestionDetails();
			return;
		}
		// loForm has previously been submitted, toggle the disabled state
		this.loDisabled = !this.loDisabled;	
		this.setQuestionDetails();
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
			this.setQuestionDetails();
			return;
		}
		// qtForm has previously been submitted, toggle the disabled state
		this.qtDisabled = !this.qtDisabled;	
		this.setQuestionDetails();
	}

	changeIsCorrectAnswer(event){
		const { index } = event;
		// loop through all the answers setting the isCorrectAnswer flag according to the index of the one that has just been selected.
		// only one is to be set so it turns off all the others
		this.answers.map((a,i) => {
			a.isCorrectAnswer = i === index ? true : false;
		});
		this.setQuestionDetails();
	}

	onEditQuestion(){
		this.editQuestion.emit(this.index);
	}

	updateAnswerTitle(event, index){
		// set the title fot the answer from it's index in the array
		this.answers[index].title = event.detail.value
		this.setQuestionDetails();
	}


	removeAnswer(index){
		// remove that index entry from the array
		this.answers.splice(index, 1);
		this.setQuestionDetails();
	}

	onStepAddAnswerButtonClicked(){
		if(this.currentStep<3){
			return;
		}
		this.onAddNewAnswer();
	}
	onAddNewAnswer(){
		this.answers.push(
			{
				title:"",
				isCorrectAnswer:false,
				imageName:""
			}
		)
		this.setQuestionDetails();
	}

	onQuestionActionSelected(event){
		console.log(event.detail);
		switch (event.detail.value){
			case "questionImg":
			case "answerImg":
				// TODO add images
				break;
			case "addAnswer":
				this.onAddNewAnswer();
				break;
			case "deleteQuestion":
				this.removeQuestion.emit(this.index);
				break;
		}
	}

	setQuestionDetails(){
		let valid = this.loSubmitted && this.qtSubmitted ? true : false;
		// check if a correct answer is set
		const ca = this.answers.filter(a => a.isCorrectAnswer);
		if(!ca.length){
			// no correct answer found so not valid
			valid = false;
		}
		if(valid){
			// check all the answer titles
			this.answers.map(a => {
				if(!a.title){
					// if one of them is not added, the question is not valid
					valid = false;
					return
				}
			});
		}
		const qDetails = {
			title:this.qtForm.value.questionTitle,
			learningObjective:this.loForm.value.learningObjective,
			answers:this.answers,
			isValid:valid,
		}
		this.questionDetails.emit(qDetails);
	}
}
