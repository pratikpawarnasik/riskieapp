import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { UserApiService } from '../../../config-pages/user.api.service';
import { NgForOf } from '@angular/common';
import { AppGlobals } from '../../../config-pages/app.global';
// import { GetAccountDetail } from '../../../config-pages/riskie-all-interface';

// Component data
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})

// Product Search Componenet Class
export class AccountComponent implements OnInit {
  getAccountDetail: any;
  accountDetail = [];
  currentPlan: any;
  element: any;
  constructor(private router: Router, private cookieService: CookieService, private userSerivce: UserApiService, private _global: AppGlobals ) {} // Constructor end here

  ngOnInit() {

    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }
    // Login API
    this.userSerivce.url_getAccountDetailAPI(this._global.g_userId)
   // .map(response => response.json())
    .subscribe(
      response => {this.getAccountDetail = response;
        if (this.getAccountDetail.status === 200) {
        this.currentPlan = this.getAccountDetail.userPlanData[0];
          for (let index = 1; index < this.getAccountDetail.userPlanData.length; index++) {
            const element = this.getAccountDetail.userPlanData[index];
            this.accountDetail.push(element);
          }
          console.log(this.accountDetail);
        } else {
          alert(this.getAccountDetail.message);
        }
      },
      error => console.log('Error :: ' + error ));

  }



} // Product Search Componenet Class end here
