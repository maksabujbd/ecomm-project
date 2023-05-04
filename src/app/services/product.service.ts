import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {product} from "../models/data.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  addProduct(data:product){
    console.warn("product add service called");
    return this.http.post('http://localhost:3000/products', data);
  }
}
