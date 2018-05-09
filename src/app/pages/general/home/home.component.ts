import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppGlobals } from '../../../config-pages/app.global';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private _global: AppGlobals) {}


  ngOnInit() {

    // if (this._global.g_userId > '0' &&  this._global.g_userId !== '') {
    //   this.router.navigate(['welcome']);
    // }
  }

} // Welcome Componenet Class end here


