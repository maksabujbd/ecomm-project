import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType = 'default';
  sellerName='';

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      console.warn(value.url);
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          console.warn('in seller area');
          this.menuType = "seller";
          if (localStorage.getItem('seller')){
            let sellerLocalstorage = localStorage.getItem('seller');
            let sellerData = sellerLocalstorage && JSON.parse(sellerLocalstorage)[0];
            this.sellerName = sellerData.name
          }
        } else {
          console.warn('outside seller');
          this.menuType='default';
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']).then();
  }

}
