import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {product} from "../models/data.type";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productData = result;
    });
  }


}
