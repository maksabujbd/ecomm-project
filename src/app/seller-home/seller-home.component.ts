import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {product} from "../models/data.type";

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  productList:undefined | product[];
  constructor(private productService:ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((result)=>{
      console.warn(result);
      this.productList = result;
    });
  }
}
