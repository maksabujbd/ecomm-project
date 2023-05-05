import {Component, OnInit} from '@angular/core';
import {login, signUp} from "../models/data.type";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = '';

  constructor(private userService: UserService) {
  }

  signUp(value: signUp) {
    this.userService.userSignUp(value);
  }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  login(data: login) {
    this.userService.userLogin(data);
    this.userService.inValidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user details";
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
