import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { UserApiService } from '../user.api';

// Component data
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

// Product Search Componenet Class
export class ProfileComponent implements OnInit {
  userId = this.cookieService.get('userId');
  userName = this.cookieService.get('userName');
  getProfileDetail: any;
  // profileDetail = {};
  updateResponse: any;
  profileDetail = {
    fullName: '',
    emailAddress: '',
    mobileNo: '',
    userType: '',
    userPackageType: '',
    userProfilePic: ''
  };
  imageUrl = '../assets/images/user_profile.png';
  fileToUpload: File = null;
  constructor(private router: Router, private cookieService: CookieService, private userSerivce: UserApiService ) {} // Constructor end here

  ngOnInit() {
    if (this.userId < '0' &&  this.userId === '') {
      this.router.navigate(['home']);
    }
    // Login API
    this.userSerivce.url_getProfileDetailAPI(this.userId)
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
    console.log(this.fileToUpload);
    const formData: FormData = new FormData();
        formData.append('emailaddress', this.profileDetail.emailAddress);
        formData.append('fullname', this.profileDetail.fullName);
        formData.append('mobileno', this.profileDetail.mobileNo);
        formData.append('profpic', this.fileToUpload);
        formData.append('userid', this.userId);

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
            console.log(formData);
  }

} // Product Search Componenet Class end here
