import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 // userEvents = new Subject<UserModel>();
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<any> {
    const baseUrl = 'http://ponyracer.ninja-squad.com';
    return this.http.post<UserModel>(`${baseUrl}/api/users`, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: {login: string; password: string}): Observable<any> {
    const baseUrl = 'http://ponyracer.ninja-squad.com';
    return this.http.post<UserModel>(`${baseUrl}/api/users/authentication`, credentials).pipe(
      tap((user: UserModel) => this.storeLoggedInUser(user))
    );
  }

  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser() {
    const myUser = window.localStorage.getItem('rememberMe');
    if (myUser) {
      const user = JSON.parse(myUser);
      this.userEvents.next(user);
    }
  }
}
