import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/Course';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  courses: Course[];/* = [
		{id:"01",name:"course 1"},
		{id:"02",name:"course 2"},
	];*/
  courseId: string = null;
  existingUsers: string[] = [];
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

  constructor(
    private usersService: UsersService,
    private coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
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
    emails = emails.split(/[:;\n]/);
    for (let e of emails) {
      let invalidEmail = !this.validateEmail(e);
      if(!invalidEmail && !this.existingUsers.includes(e) && !this.newUsersEmails.includes(e)) {
        let matches = [...this.users].filter(c => c.emailAddress.toLowerCase().includes(e.toLowerCase()));
        if (matches.length > 0) this.existingUsers.push(e);
        else {
          this.newUsersEmails.push(e);
          this.newUsers.push({EmailAddress: e, FirstName: '', LastName: ''});
        }
      }
    }
    this.buttonDisabled = !this.validateForm();
  }

  removeUser(user) {
    if (this.existingUsers.includes(user)) this.existingUsers.splice(this.existingUsers.indexOf(user), 1);
    if (this.newUsersEmails.includes(user)) {
      this.newUsers.splice(this.newUsersEmails.indexOf(user), 1);
      this.newUsersEmails.splice(this.newUsersEmails.indexOf(user), 1);
    }
    this.buttonDisabled = !this.validateForm();
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
    if (this.existingUsers.length < 1 && this.newUsers.length < 1) return false;
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
        next: response => this.successResults = response.body.results
      });
    }
  }

  returnToDashboard() {
    // 
  }

}
