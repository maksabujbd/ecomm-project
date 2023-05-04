import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUp} from "../models/data.type";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private route: Router) {
  }

  userSignUp(data: SignUp) {
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
}
