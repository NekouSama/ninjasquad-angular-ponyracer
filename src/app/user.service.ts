import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtInterceptorService } from './jwt-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 // userEvents = new Subject<UserModel>();
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient,
              private jwtInterceptorService: JwtInterceptorService) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<any> {
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: {login: string; password: string}): Observable<any> {
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users/authentication`, credentials).pipe(
      tap((user: UserModel) => this.storeLoggedInUser(user))
    );
  }

  logout() {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
    this.jwtInterceptorService.removeJwtToken();
  }

  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
    this.jwtInterceptorService.setJwtToken(user.token);
  }

  retrieveUser() {
    const myUser = window.localStorage.getItem('rememberMe');
    if (myUser) {
      const user = JSON.parse(myUser);
      this.userEvents.next(user);
      this.jwtInterceptorService.setJwtToken(user.token);
    }
  }
}
