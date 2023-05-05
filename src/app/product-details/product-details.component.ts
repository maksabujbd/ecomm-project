import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {cart, product} from "../models/data.type";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId === item.id.toString());
        this.removeCart = !!items.length;
      }
    });
  }

  handleQuantity(value: string) {
    if (value === 'plus' && this.productQuantity < 20) {
      this.productQuantity += 1;
    } else if (value === 'minus' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        console.warn(this.productData);
        this.productService.locallyAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('user logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn("userId: ", userId);
        let cartData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id
        };
        delete cartData.id;
        console.warn(cartData);
        this.productService.AddToCart(cartData).subscribe((result) => {
          if (result) {
            alert('Product is added in your cart');
          }
        })
      }
    }
  }

  removeFromCart(productId: number) {
    this.productService.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
