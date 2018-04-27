import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { UserApiService } from '../user.api';
import { NgForOf } from '@angular/common';
// Component data
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})

// Product Search Componenet Class
export class AccountComponent implements OnInit {
  _userId = this.cookieService.get('userId');
  _userName = this.cookieService.get('userName');
  getAccountDetail: any;
  accountDetail =  [];
  currentPlan: any;
  element: any;
  constructor(private router: Router, private cookieService: CookieService, private userSerivce: UserApiService ) {} // Constructor end here

  ngOnInit() {
    if (this._userId < '0' &&  this._userId === '') {
      this.router.navigate(['home']);
    }
    // Login API
    this.userSerivce.url_getAccountDetailAPI(this._userId)
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
