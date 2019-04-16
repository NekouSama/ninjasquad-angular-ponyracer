import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEvents: Subject<UserModel>;

  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<any> {
    const baseUrl = 'http://ponyracer.ninja-squad.com';
    return this.http.post(`${baseUrl}/api/users`, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: {login: string; password: string}): Observable<any> {
    const baseUrl = 'http://ponyracer.ninja-squad.com';
    return this.http.post(`${baseUrl}/api/users/authentication`, credentials);
  }
}
