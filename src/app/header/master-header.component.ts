import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppGlobals } from '../config-pages/app.global';

@Component({
  selector: 'app-master-header',
  templateUrl: './master-header.component.html'
})
export class MasterHeaderComponent implements OnInit {
  userId = this.cookieService.get('userId');
  userName = this.cookieService.get('userName');
  userProfilePath = this.cookieService.get('profilePic');
  profileFullPath = '../assets/images/user_profile.png';
 // profilePic = this.cookieService.get('profilePic');

  constructor( private router: Router, private cookieService: CookieService, private _global: AppGlobals ) { }
  logoutBtn() {
    this.cookieService.delete('userId');
    this.cookieService.delete('authCode');
    this.cookieService.delete('userEmailId');
    this.cookieService.delete('isAdmin');
    this.cookieService.delete('userName');
    // this.router.navigate(['home']);
    // this.cookieService.deleteAll();
    window.location.reload();
  }
  ngOnInit() {
    // if (this.userProfilePath !== null ) {
    //   this.profileFullPath = this._global.profileFolderPathUrl + this.userProfilePath;
    // }
  }

}
