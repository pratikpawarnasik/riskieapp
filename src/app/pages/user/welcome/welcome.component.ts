import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router } from '@angular/router';

// Component data
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
// Welcome Componenet Class
export class WelcomeComponent implements OnInit {
  userId = this.cookieService.get('userId');
  userName = this.cookieService.get('userName');
  constructor(private router: Router, private cookieService: CookieService) {} // Constructor end here

  ngOnInit() {
    if (this.userId < '0' &&  this.userId === '') {
      this.router.navigate(['home']);
    }
  }

} // Welcome Componenet Class end here
