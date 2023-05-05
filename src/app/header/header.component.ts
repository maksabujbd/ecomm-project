import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {product} from "../models/data.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType = 'default';
  sellerName = '';
  userName: string = '';
  searchResult: undefined | product[];

  constructor(private route: Router, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerLocalstorage = localStorage.getItem('seller');
            let sellerData = sellerLocalstorage && JSON.parse(sellerLocalstorage)[0];
            this.sellerName = sellerData.name
          }
        } else if (localStorage.getItem('user')) {
          let userLocalStorage = localStorage.getItem('user');
          let userData = userLocalStorage && JSON.parse(userLocalStorage);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']).then();
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((data) => {
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResult = data;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(value: string) {
    console.warn(value);
    this.route.navigate([`search/${value}`]).then(r => {
    });
  }

  redirectToDetails(id: number) {
    console.warn('redirect: ' + id);
    this.route.navigate(['/details/' + id]).then();
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']).then();
  }
}
