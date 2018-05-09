import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AppGlobals } from '../../../config-pages/app.global';
import { RouterModule, Routes, Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../../../config-pages/user.api.service';

declare let paypal: any;
@Component({
  selector: 'app-paymentstatus',
  templateUrl: './paymentstatus.component.html',
  styleUrls: ['./paymentstatus.component.css'],
})
export class PymentStatusComponent implements OnInit  {
    private sub: any;
    statusid: number;
  constructor(private route: ActivatedRoute, private router: Router, private _global: AppGlobals, private userSerivce: UserApiService) { }


  ngOnInit(): void {

    if (this._global.g_userId < '0' &&  this._global.g_userId === '') {
      this.router.navigate(['home']);
    }
    this.sub = this.route.params.subscribe(params => {
      this.statusid = +params['status']; // (+) converts string 'id' to a number
    });
  }
}
