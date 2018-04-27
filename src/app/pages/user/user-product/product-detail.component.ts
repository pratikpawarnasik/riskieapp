import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {Location} from '@angular/common';
import { UserApiService } from '../user.api';
// Component data
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
// Product Search Componenet Class
export class ProductDetailComponent implements OnInit {
    userId = this.cookieService.get('userId');
    userName = this.cookieService.get('userName');
    getProductDetail: any;
    productList: any;
    productFMEA = [];
    private sub: any;
    productId: number;

  constructor(private router: Router,
              private cookieService: CookieService,
              private userSerivce: UserApiService,
              private route: ActivatedRoute,
              private _location: Location ) {} // Constructor end here

  ngOnInit() {
    if (this.userId < '0' &&  this.userId === '') {
      this.router.navigate(['home']);
    }

    this.sub = this.route.params.subscribe(params => {
      this.productId = +params['productId']; // (+) converts string 'id' to a number
    });

    // Product Detail API
    this.userSerivce.url_getProductDetailAPI(this.userId, this.productId)
   // .map(response => response.json())
    .subscribe(
      response => {this.getProductDetail = response;
        if (this.getProductDetail.status === 200) {
          this.productFMEA = this.getProductDetail.fmeadtls;
          this.productList = this.getProductDetail.productinfo;
          console.log(this.getProductDetail);
        } else {
          alert(this.getProductDetail.message);
        }
      },
      error => console.log('Error :: ' + error ));


  }
  backClicked() {
      this._location.back();
  }

} // Product Search Componenet Class end here


