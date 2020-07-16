import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	constructor() { }
	
	// FAKE STATIC CALL
	getUsersBasic() : Observable<any> {
		let users : any[] = [
			{fullName:"Guy Brown",emailAddress:"guy@guy.com"},
			{fullName:"Dave Dave",emailAddress:"dave@dave.com"},
		];;
		return Observable.create( observer => {
				observer.next({ users });
				observer.complete();
		});
	}
		
	// FAKE STATIC CALL
	batchCreateUser(newUsers) {
		return Observable.create( observer => {
			observer.next({ users:newUsers });
			observer.complete();
		});
	}

	// FAKE STATIC CALL
	batchAssignUserToCourseByEmail(emailList, courseId) {
		//User is already assigned to that course
		//Success
		//Failed to Register
		//Created and Assigned
		const results = emailList.map(item => {
			return {
				email:item.emailAddress,
				name:item.fullName,
				result:"Success"
			}
		})
		results.push({
			email:"fake-user-one@fake.com",
			name:"Fake One",
			result:"User is already assigned to that course"
		})
		results.push({
			email:"fake-user-two@fake.com",
			name:"Fake Two",
			result:"Success"
		})
		results.push({
			email:"fake-user-three@fake.com",
			name:"Fake Three",
			result:"Failed to Register"
		})
		results.push({
			email:"fake-user-four@fake.com",
			name:"Fake Four",
			result:"Created and Assigned"
		})
		const body = {
			results,
			Emails: emailList,
			CourseId: courseId,
		}
		return Observable.create( observer => {
			observer.next({ body });
			observer.complete();
		});
	}
	
}
