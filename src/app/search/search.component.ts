import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {product} from "../models/data.type";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult : undefined| product[];
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    const query = this.activatedRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.productService.searchProducts(query).subscribe((result)=>{
      this.searchResult = result;
    });
  }
}
