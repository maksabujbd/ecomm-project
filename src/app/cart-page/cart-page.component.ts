import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {cart, cartSummary} from "../models/data.type";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: undefined | cart[];
  cartSummary: cartSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryCharge: 0,
    total: 0
  }

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      console.warn(result);
      this.cartData = result;
      let price = 0;
      this.cartData.forEach((item) => {
        if (item.quantity) {
          price += (+item.price * +item.quantity);
        }
      });
      this.cartSummary.price = price;
      this.cartSummary.discount = price / 10;
      this.cartSummary.tax = price / 10;
      this.cartSummary.deliveryCharge = 100;
      this.cartSummary.total = this.cartSummary.price
        - this.cartSummary.discount + this.cartSummary.tax
        + this.cartSummary.deliveryCharge;
    });
  }
}
