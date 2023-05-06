import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {cart, order, product} from "../models/data.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) {
  }

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getAllProducts() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  locallyAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  AddToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`,
      {observe: 'response'})
      .subscribe((result) => {
        console.warn('result: ', result);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeFromCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userId);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userId}`);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId,
      {observe: 'response'}).subscribe((result) => {
      if (result) {
        this.cartData.emit([]);
      }
    });
  }

  cancelOrder (orderId: number){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }
}

