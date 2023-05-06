import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {cart, order} from "../models/data.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMessage: string | undefined;

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price += (+item.price * +item.quantity);
        }
      });
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
      console.warn(this.totalPrice);
    });
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userData = user && JSON.parse(user);
    let userId = userData.id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id);
        }, 500);
      })
      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMessage = "Your order has been placed";
         setTimeout(()=>{
           this.router.navigate(['my-orders']).then();
           this.orderMessage = undefined;
         }, 4000);
        }
      });
    }
  }

}
