import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DelegateType } from "../../models/DelegateType";

@Component({
  selector: 'delegate-details',
  templateUrl: './delegate-details.component.html',
  styleUrls: ['./delegate-details.component.css']
})
export class DelegateDetailsComponent {
	@Input ('fullName') fullName:string;
	@Input ('emailAddress') emailAddress:string;
	@Input ('delegateType') delegateType:DelegateType;
	@Output('removeUser') removeUser = new EventEmitter();
	@Output('updateName') updateName = new EventEmitter();
	public DelegateTypeEnum = DelegateType;
  constructor() { }

	onRemoveUser(){
		this.removeUser.emit(this.emailAddress);
	}
	onUserNameUpdated(event:CustomEvent) {
		this.updateName.emit(event);
	}
}
