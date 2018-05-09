import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { AppGlobals } from '../../../config-pages/app.global';
import {Location} from '@angular/common';
import { UserApiService } from '../../../config-pages/user.api.service';
// Component data
@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html'
})
// Product Search Componenet Class
export class UserProductComponent implements OnInit {
   // userId = this.cookieService.get('userId');
   // userName = this.cookieService.get('userName');
    getproductList: any;
    productList: any;
    private sub: any;
    categoryId: number;

  constructor(private router: Router,
              private cookieService: CookieService,
              private userSerivce: UserApiService,
              private route: ActivatedRoute,
              private _location: Location,
              private _global: AppGlobals ) {} // Constructor end here

  ngOnInit() {
    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }

    this.sub = this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId']; // (+) converts string 'id' to a number
    });


    // Login API
    this.userSerivce.url_getProductByCategoryAPI(this.categoryId)
   // .map(response => response.json())
    .subscribe(
      response => {this.getproductList = response;
        if (this.getproductList.status === 200) {
          this.productList = this.getproductList.catprodlist;
          console.log(this.productList);
        } else {
          alert(this.getproductList.message);
          this._location.back();
        }
      },
      error => console.log('Error :: ' + error ));


  }

} // Product Search Componenet Class end here

