import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { AppGlobals } from '../../../config-pages/app.global';
import { UserApiService } from '../../../config-pages/user.api.service';
import {Location} from '@angular/common';

// Component data
@Component({
  selector: 'app-user-product-search',
  templateUrl: './user-product-search.component.html'
})
// Product Search Componenet Class
export class UserProductSearchComponent implements OnInit {
 // userId = this.cookieService.get('userId');
 // userName = this.cookieService.get('userName');
  getCategoryList: any;
  categoryList: any;
  constructor(private router: Router, private _location: Location, private cookieService: CookieService, private userSerivce: UserApiService, private _global: AppGlobals ) {} // Constructor end here

  ngOnInit() {
    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }
    // Login API
    this.userSerivce.url_getCategoryAPI()
   // .map(response => response.json())
    .subscribe(
      response => {this.getCategoryList = response;
        if (this.getCategoryList.status === 200) {
          this.categoryList = this.getCategoryList.catdata;
          console.log(this.getCategoryList.catdata);
        } else {
          alert(this.getCategoryList.message);
          this._location.back();
        }
      },
      error => console.log('Error :: ' + error ));
  }

} // Product Search Componenet Class end here
