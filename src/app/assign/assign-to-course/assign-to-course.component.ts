import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Course';
import { DelegateType } from "../../models/DelegateType";

@Component({
  selector: 'assign-to-course',
  templateUrl: './assign-to-course.component.html',
  styleUrls: ['./assign-to-course.component.css']
})
export class AssignToCourseComponent implements OnInit {
	courses: Course[];
	courseId: string = null;
  existingUsersEmails: string[] = [];
  existingUsers: any[] = [];
  newUsersEmails: string[] = [];
  newUsers: any[] = [];
  createdUsers: any[] = [];
  form: FormGroup;
  users;
  results;
  successResults = null;
  in;
  buttonDisabled: boolean = true;
	showConfirmation = false;
	reissueIfAlreadyAssigned = false;
	DelegateTypeEnum = DelegateType;
  constructor(
		private usersService: UsersService,
		private coursesService: CoursesService
	) { }

  ngOnInit() {
		this.coursesService.getCourses().subscribe({
      next: courses => this.courses = courses.courses
		});
		this.usersService.getUsersBasic().subscribe({
      next: res => this.users = res.users
    });
    this.buttonDisabled = !this.validateForm();
  }

	onSelectCourse(e) {
    if (e.detail.value === '') {
      this.courseId = null;
      return;
    }
    this.courseId = e.detail.value;
    this.buttonDisabled = !this.validateForm();
	}
	

  onSearchInput(event) {
    let input = event.detail.value;
    this.in = input;
    this.results = [...this.users].filter(c => {
      return c.emailAddress.toLowerCase().includes(input.toLowerCase()) || c.fullName.toLowerCase().includes(input.toLowerCase());
    });
  }

  onSearchSelected(event) {
    this.in = event.detail.selectedOptionValue
    this.addUser();
    event.target.setValue("");
  }

  addUser(em = null) {
    let emails = em !== null ? em.clipboardData.getData('Text') : this.in;
    emails = emails.split(/[ :;,\n]/);
    for (let e of emails) {
      if (e === '') continue;
      let invalidEmail = !this.validateEmail(e);
      if(!invalidEmail && !this.existingUsersEmails.includes(e) && !this.newUsersEmails.includes(e)) {
        let matches = [...this.users].filter(c => c.emailAddress.toLowerCase().includes(e.toLowerCase()));
        if (matches.length === 1) {
          let userIndex = this.indexOfProperty(this.users, 'emailAddress', e);
          this.existingUsers.push(this.users[userIndex]);
          this.existingUsersEmails.push(e);
        }
        else {
          this.newUsersEmails.push(e);
          this.newUsers.push({EmailAddress: e, FirstName: '', LastName: ''});
        }
      }
    }
    this.buttonDisabled = !this.validateForm();
  }

  removeUser(user) {
    if (this.existingUsersEmails.includes(user)) {
      this.existingUsers.splice(this.existingUsersEmails.indexOf(user), 1);
      this.existingUsersEmails.splice(this.existingUsersEmails.indexOf(user), 1);
    }
    if (this.newUsersEmails.includes(user)) {
      this.newUsers.splice(this.newUsersEmails.indexOf(user), 1);
      this.newUsersEmails.splice(this.newUsersEmails.indexOf(user), 1);
    }
    this.buttonDisabled = !this.validateForm();
  }

  indexOfProperty(array: any[], property: string, value: any) : number {
    for (let i = 0; i < array.length; i++) {
      if (array[i][property] === value) return i;
    }
    return -1;
  }

  validateEmail(email: string) : boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = re.test(String(email).toLowerCase());
    
    if (!valid) {
      const confrimAlertEvent = new CustomEvent("tfShowAlert", {
        detail: {
          message: `'${email}' is not a valid email address`,
          colour: "red",
          icon: "exclamation",
          showDuration: "2000",
        },
        bubbles: true,
      });
      document.body.dispatchEvent(confrimAlertEvent);
    }
    return valid;
  }

  validateForm() {
    if (this.courseId === null) return false;
    if (this.existingUsersEmails.length < 1 && this.newUsers.length < 1) return false;
    if (this.newUsers.length < 1) return true;
    for (let user of this.newUsers) {
      console.log(user)
      if (user.EmailAddress.length < 1 || user.FirstName.length < 1 || user.LastName.length < 1) return false;
    }
    return true;
  }

  handleNameInput(e) {
    let value = e.detail.value;
    let email = e.detail.id.split(":")[0];
    let field = e.detail.id.split(":")[1];

    let emailPos = this.newUsers.map(x => {
      return x.EmailAddress;
    }).indexOf(email);

    switch(field) {
      case "first": this.newUsers[emailPos].FirstName = value; break;
      case "last": this.newUsers[emailPos].LastName = value; break;
    }

    this.buttonDisabled = !this.validateForm();
  }

  setReissueIfAlreadyAssigned(event) {
    this.reissueIfAlreadyAssigned = event.detail.value;
  }

  createUsersAndAssign() {
    if (this.buttonDisabled) return;

    if (this.newUsers.length > 0) this.createUsers(this.newUsers);
    else this.assign();
    this.showConfirmation = true;
  }

  createUsers(users) {
    this.usersService.batchCreateUser(users).subscribe({
      next: response => {
        users.forEach(usr => {
          this.createdUsers.push(usr);
        });
        this.newUsers = [];
        this.newUsersEmails = [];
        this.assign();
      }
    })
  }

  assign() {
    //TODO: Assign Course instead of category

    let emails = this.existingUsers;
    this.createdUsers.forEach(element => {
      emails.push(element.EmailAddress);
    });

    if (this.existingUsers.length > 0) {
      this.usersService.batchAssignUserToCourseByEmail(emails, this.courseId).subscribe({
        next: response => {
					console.log("response >>>>>>>>>> ")
					console.log(response)
					this.successResults = response.body.results
					console.log(this.successResults)
				}
      });
    }
  }

	getStatusColour(str:string):string{
		let statusColour = 'amber';
		switch (str.toLowerCase()){
			case "success":
				statusColour = 'green';
				break;
			case "failed to register":
				statusColour = 'red';
				break;
			case "created and assigned":
				statusColour = 'blue';
				break;
		}
		console.log(str, statusColour);
		return statusColour;
	}
  returnToDashboard() {
    // 
  }
}
