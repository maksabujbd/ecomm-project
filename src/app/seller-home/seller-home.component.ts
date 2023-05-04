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
  productDeleteMessage: undefined | string;
  constructor(private productService:ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((result)=>{
      console.warn(result);
      this.productList = result;
    });
  }

  deleteProduct(product: product) {
    this.productService.deleteProduct(product.id).subscribe((result)=>{
      if (result){
        this.productDeleteMessage="Product is deleted successfully";
        this.getAllProducts();
      }
    })
    setTimeout(()=>{
      this.productDeleteMessage=undefined;
    }, 3000)
  }
}
