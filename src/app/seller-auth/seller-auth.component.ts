import {Component, OnInit} from '@angular/core';
import {SellerService} from "../services/seller.service";
import {Router} from "@angular/router";
import {SignUp} from "../models/data.type";

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  constructor(private seller: SellerService,
              private router: Router) {
  }

  showLogin=false;

  signUp(data: SignUp) {
    this.seller.userSignUp(data);
  }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  login(data: SignUp) {
    console.warn(data);
  }
}
