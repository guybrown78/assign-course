import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.css']
})
export class AnswerDetailsComponent implements OnInit {
	@Input ('title') title:string;
	@Input ('isCorrectAnswer') isCorrectAnswer:boolean;
	@Input ('index') index:number;
	@Input ('imageName') imageName:string;
	@Input ('disabled') disabled:boolean;
	@Output('changeIsCorrectAnswer') changeIsCorrectAnswer = new EventEmitter();
	@Output('removeAnswer') removeAnswer = new EventEmitter();
	@Output('updateTitle') updateTitle = new EventEmitter();
	uploadImageConfirmationOpened:boolean = false;
  constructor() { }

  ngOnInit() {
  }

	onToggleCorrectAnswer(){
		// act like a radio button set and don't allow them to turn off without setting another answer first
		if(this.isCorrectAnswer)
			return;
		this.isCorrectAnswer = !this.isCorrectAnswer;
		this.changeIsCorrectAnswer.emit({index:this.index, isCorrectAnswer:this.isCorrectAnswer})
	}
	onRemoveAnswer(){
		this.removeAnswer.emit(this.index);
	}
	onAnswerTitleUpdated(event:CustomEvent) {
		this.updateTitle.emit(event);
	}

	onUploadImage(){
		this.uploadImageConfirmationOpened = true;
	}

	modalUploadImageClosedHandler(){
		this.uploadImageConfirmationOpened = false;
	}
	modalUploadImageConfirmedHandler(){
		this.uploadImageConfirmationOpened = false;
	}
}
