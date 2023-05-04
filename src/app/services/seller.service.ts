import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {login, signUp} from "../models/data.type";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route: Router) {
  }

  userSignUp(data: signUp) {
    let result = this.http.post("http://localhost:3000/seller",
      data,
      {observe: 'response'}
    ).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.route.navigate(['seller-home']).then();
      console.warn(result);
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']).then();
    }
  }

  userLogin(data: login){
    console.warn(data);
   this.http.get(`http://localhost:3000/seller?email=${data.email}&&password=${data.password}`,
     {observe: 'response'}
   ).subscribe((result:any)=>{
     console.warn(result);
     if (result && result.body && result.body.length){
       console.warn("user logged in");
       localStorage.setItem('seller', JSON.stringify(result.body));
       this.route.navigate(['seller-home']).then();
     }else{
       console.warn("login failed");
       this.isLoginError.emit(true);
     }
   })
  }
}
