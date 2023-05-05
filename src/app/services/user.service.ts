import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {login, signUp} from "../models/data.type";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  userSignUp(user: signUp) {
    return this.http.post('http://localhost:3000/users', user
      , {observe: 'response'})
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']).then();
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']).then();
    }
  }

  userLogin(data: login) {
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`
      , {observe: 'response'})
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.inValidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']).then();
        } else {
          this.inValidUserAuth.emit(true);
        }
      });
  }
}
