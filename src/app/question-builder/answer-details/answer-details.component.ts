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
	@Output('removeAnswer') removeAnswer = new EventEmitter();
	@Output('updateTitle') updateTitle = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

	onRemoveAnswer(){
		this.removeAnswer.emit(this.index);
	}
	onAnswerTitleUpdated(event:CustomEvent) {
		this.updateTitle.emit(event);
	}
}
