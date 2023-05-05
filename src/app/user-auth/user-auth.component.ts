import {Component} from '@angular/core';
import {signUp} from "../models/data.type";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  signUp(value: signUp) {
    console.warn(value);
  }
}
