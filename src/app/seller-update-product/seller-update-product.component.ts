import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {product} from "../models/data.type";

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product;
  updateProductMessage: undefined | string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router:Router) {
  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = "Product has updated successfully";
      }
    });
    setTimeout(() => {
      this.updateProductMessage = undefined;
      this.router.navigate(['seller-home']).then();
    }, 3000);
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;
    })
  }
}
