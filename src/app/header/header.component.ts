import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType = 'default';

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      console.warn(value.url);
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          console.warn('in seller area');
          this.menuType = "seller";
        } else {
          console.warn('outside seller');
          this.menuType='default';
        }
      }
    })
  }

}
