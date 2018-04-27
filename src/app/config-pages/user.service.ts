import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router } from '@angular/router';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  cookieValue = this.cookieService.get('userId');
  headerStatus = false;
constructor(private cookieService: CookieService, private router: Router) {
      this.isUserLoggedIn = false;
      // this.cookieValue = this.cookieService.get('userId');
  }

//   setUserLoggedIn() {
//     this.isUserLoggedIn = true;
//   }

  getUserLoggedIn() {

      if (this.cookieValue > '0') {
          this.headerStatus = true;
          return true;
      } else {
        this.router.navigate(['home']);
        return false;
      }
  }

}
