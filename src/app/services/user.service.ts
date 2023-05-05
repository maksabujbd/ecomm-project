import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {signUp} from "../models/data.type";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  userSignUp(user: signUp) {
    return this.http.post('http://localhost:3000/users', user
      , {observe: 'response'}).subscribe((result) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']).then();
      }
    });
  }
  userAuthReload(){
    if (localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
