import {Component} from '@angular/core';
import {signUp} from "../models/data.type";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  constructor(private userService:UserService) {
  }
  signUp(value: signUp) {
    this.userService.userSignUp(value);
  }
}
