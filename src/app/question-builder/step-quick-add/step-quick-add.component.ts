import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'step-quick-add',
  templateUrl: './step-quick-add.component.html',
  styleUrls: ['./step-quick-add.component.css']
})
export class StepQuickAddComponent implements OnInit {
	@Input ('title') title:string;
	@Input ('disabled') disabled:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
