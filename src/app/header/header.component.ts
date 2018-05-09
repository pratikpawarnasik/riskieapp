import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../config-pages/header-api.service';
import { TestinServiceData, UserRegistration, UserLogin } from '../config-pages/riskie-all-interface';

import { RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../config-pages/user.service';
import { AppGlobals } from '../config-pages/app.global';

  // unamePattern = "^[a-z0-9_-]{8,15}$";
  // pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  // mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ApiService]
})

export class HeaderComponent implements OnInit {
  _postsArray: TestinServiceData[];
  getResponse: UserRegistration[];
  getLoginData: UserLogin[];
  userLogin: UserLogin;
  reg: UserRegistration;
  modalReferenceReg: NgbModalRef;
  modalReferenceLogin: NgbModalRef;
  posts: any;
  loginResponse: any;
  regResponse: any;
  userId = this._global.g_userId;
  constructor(private modalService: NgbModal,
              private http: HttpClient,
              private apiSerivce: ApiService,
              private cookieService: CookieService,
              private router: Router,
              private user: UserService,
              private _global: AppGlobals) {}

  getPosts(): void {
    this.apiSerivce.url_getPosts().
    subscribe(
       resultArray => this._postsArray = resultArray,
       error => console.log('Error :: ' + error ));
  }
  ngOnInit() {
    this.reg = {
      fullName: '',
      emailAddress: '',
      mobileNo: '',
      password: ''
    };
    this.userLogin = {
      emailAddress: '',
      password: ''
    };
    // this.getPosts();
  }
  // Open Registration form modal
  openRegForm(registration: any) {
    if (this.modalReferenceLogin) {
      this.modalReferenceLogin.close();
    }
    this.modalReferenceReg = this.modalService.open(registration, { centered: true });
  }
  // Open Login form modal
  openLoginForm(login: any) {
    if (this.modalReferenceReg) {
      this.modalReferenceReg.close();
    }
    this.modalReferenceLogin = this.modalService.open(login, { centered: true });
  }
  // Login form submit
  submitLoginForm() {
    const formData: FormData = new FormData();
        formData.append('emailaddress', this.userLogin.emailAddress);
        formData.append('password', this.userLogin.password);

      this.apiSerivce.url_userLoginFun(formData).
      // .map(response => response.json())
        subscribe(
            resultArray => {this.loginResponse = resultArray;
              if (this.loginResponse.status === 1) {
                // this.user.setUserLoggedIn();
               // console.log(this.loginResponse);
                this.cookieService.set( 'userId', this.loginResponse.uid );
                this.cookieService.set( 'authCode', this.loginResponse.authcode );
                this.cookieService.set( 'userEmailId', this.loginResponse.email );
                this.cookieService.set( 'isAdmin', this.loginResponse.isadmin );
                this.cookieService.set( 'userName', this.loginResponse.name );
                this.cookieService.set( 'profilePic', this.loginResponse.image );
                if (this.modalReferenceReg) {
                  this.modalReferenceReg.close();
                }
                if (this.modalReferenceLogin) {
                  this.modalReferenceLogin.close();
                }
                this.router.navigate(['welcome']);
                window.location.reload();
              } else {
                alert(this.loginResponse.message);
              }
            },
            error => console.log('Error :: ' + error ));
  }
  // Registration form submit
  submitRegForm() {

      const queryHeaders = new HttpHeaders();
          queryHeaders.append('Content-Type', 'application/json');
          queryHeaders.append('Authorization', 'my-auth-token');

      const formData: FormData = new FormData();
        formData.append('fullname', this.reg.fullName);
        formData.append('emailaddress', this.reg.emailAddress);
        formData.append('mobileno', this.reg.mobileNo);
        formData.append('password', this.reg.password);


      this.apiSerivce.url_userRegistrationFun(formData, queryHeaders).
      subscribe(
        resultArray => {this.regResponse = resultArray;
          if (this.regResponse.status === 200) {
            // this.user.setUserLoggedIn();
           // console.log(this.loginResponse);
           // window.location.reload();
           this.userLogin.emailAddress = this.reg.emailAddress;
           this.userLogin.password = this.reg.password;
           this.submitLoginForm();
          } else {
            alert(this.regResponse.message);
          }
        },
          //  subscribe(
          //         resultArray => this.getResponse = resultArray,
                  error => console.log('Error :: ' + error ));
                 // console.log(this.getResponse);

    // this.posts = this.http.post(this.ROOT_URL + '/user/subcribeForm', formData, { headers: queryHeaders});
    // console.log(this.posts);
  }
}

