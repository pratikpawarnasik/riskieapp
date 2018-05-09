import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { AppGlobals } from '../../../config-pages/app.global';

import { UserApiService } from '../../../config-pages/user.api.service';

// Component data
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

// Product Search Componenet Class
export class ProfileComponent implements OnInit {

  // userName = this.cookieService.get('userName');
  getProfileDetail: any;
  // profileDetail = {};
  updateResponse: any;
  passUpdateResponse: any;
  profileDetail = {
    fullName: '',
    emailAddress: '',
    mobileNo: '',
    userType: '',
    userPackageType: '',
    userProfilePic: ''
  };
  manPass = {
    curPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  imageUrl = 'assets/images/user_profile.png';
  fileToUpload: File = null;
  httpOptions: any;
  constructor(private router: Router, private cookieService: CookieService, private userSerivce: UserApiService, private _global: AppGlobals ) {} // Constructor end here

  ngOnInit() {
    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    // Login API
    this.userSerivce.url_getProfileDetailAPI(this._global.g_userId)
   // .map(response => response.json())
    .subscribe(
      response => {this.getProfileDetail = response;
        if (this.getProfileDetail.status === 200) {
         // this.profileDetail = this.getProfileDetail.userdata;
          this.profileDetail = {
            fullName: this.getProfileDetail.userdata.name,
            emailAddress: this.getProfileDetail.userdata.email,
            mobileNo: this.getProfileDetail.userdata.contactno,
            userType: this.getProfileDetail.userdata.isadmin,
            userPackageType: this.getProfileDetail.userdata.pakagetype,
            userProfilePic: this.getProfileDetail.userdata.image
          };
          console.log(this.profileDetail);
        } else {
          alert(this.getProfileDetail.message);
        }
      },
      error => console.log('Error :: ' + error ));

  }
  uploadImg(file: FileList) {
  //  console.log(file);
    this.fileToUpload = file.item(0);
    // SHOW image preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
    reader.readAsDataURL(this.fileToUpload);
  }
  // Profile Update form submit
  submitProfileUpdateForm(frm) {
   // console.log(this.fileToUpload);
    const formData: FormData = new FormData();
        formData.append('emailaddress', this.profileDetail.emailAddress);
        formData.append('fullname', this.profileDetail.fullName);
        formData.append('mobileno', this.profileDetail.mobileNo);
        formData.append('profpic', this.fileToUpload);
        formData.append('userid', this._global.g_userId);
        console.log(formData);
      this.userSerivce.url_updateProfileDetailAPI(formData).
      // .map(response => response.json())
        subscribe(
            resultArray => {this.updateResponse = resultArray;
              if (this.updateResponse.status === 200) {
                if (this.fileToUpload !== null) {
                  this.cookieService.set( 'profilePic', this.updateResponse.userPic );
                }
                console.log(this.updateResponse);
                // this.router.navigate(['welcome']);
                window.location.reload();
              } else {
                alert(this.updateResponse.message);
              }
            },
            error => console.log('Error :: ' + error ));
  }
  log(x) {
    console.log(x);
  }
  submitPasswordUpdateForm(asdf) {
    const formData: FormData = new FormData();
        formData.append('curentpass', this.manPass.curPassword);
        formData.append('newpass', this.manPass.newPassword);
        formData.append('userid', this._global.g_userId);
        this.httpOptions.headers =
        this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
      this.userSerivce.url_changePasswordAPI(formData, this.httpOptions).
      // .map(response => response.json())
        subscribe(
            resultArray => {this.passUpdateResponse = resultArray;
              if (this.passUpdateResponse.status === 200) {
                console.log(this.passUpdateResponse);
                // this.router.navigate(['welcome']);
                window.location.reload();
              } else {
                alert(this.passUpdateResponse.message);
              }
            },
            error => console.log('Error :: ' + error ));
  }
} // Product Search Componenet Class end here
