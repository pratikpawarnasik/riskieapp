import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) {}
  cookieValue = this.cookieService.get('userId');
  ngOnInit() {
    if (this.cookieValue > '0') {
      this.router.navigate(['welcome']);
  }
  }

}

