import {Component, OnInit} from '@angular/core';
import {cart, login, product, signUp} from "../models/data.type";
import {UserService} from "../services/user.service";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = '';

  constructor(private userService: UserService, private productService: ProductService) {
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
        this.authError = "User not found";
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 500);
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        console.warn("cart data final: ", cartData);

        setTimeout(() => {
          this.productService.AddToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item store in DB");
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      })
    }
  }
}
