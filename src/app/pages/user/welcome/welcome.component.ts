import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppGlobals } from '../../../config-pages/app.global';

// Component data
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
// Welcome Componenet Class
export class WelcomeComponent implements OnInit {
  userName = this._global.g_userName;
  constructor(private router: Router, private cookieService: CookieService, private _global: AppGlobals) {} // Constructor end here

  ngOnInit() {
    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }
  }

} // Welcome Componenet Class end here
