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
		const body = {
			Emails: emailList,
			CourseId: courseId,
		}
		return Observable.create( observer => {
			observer.next({ body });
			observer.complete();
		});
	}
	
}
