import { Component, OnInit } from '@angular/core';
import { UserService } from './config-pages/user.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 // headerStatus = false;
  constructor(private cookieService: CookieService) {}
 // cookieValue = this.cookieService.get('userId');
  ngOnInit() {
    // if (this.cookieValue > '0') {
    //   this.headerStatus = true;
    // } else {
    //   this.headerStatus = false;
    // }
  // console.log(window.location.origin);
  }
}

