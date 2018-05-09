import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Location} from '@angular/common';
@Injectable()
export class AppGlobals {
// Live URL
    //  readonly baseAppUrl: string = 'http://localhost:4200/';
    // readonly baseAPIUrl: string = 'http://siddhiglobal.net/acceptance/riskie_dev/index.php/';
    // readonly profileFolderPathUrl: string = 'http://siddhiglobal.net/acceptance/riskie_dev/images/userimages/';
// Locahost URL
    readonly baseAPIUrl: string = 'http://localhost/riskie/index.php/';
    readonly profileFolderPathUrl: string = 'http://localhost/riskie/images/userimages/';
    g_userId = this.cookieService.get('userId');
    g_userName = this.cookieService.get('userName');
    g_isAdmin = this.cookieService.get('isAdmin');

    constructor(private _location: Location, private cookieService: CookieService) {
       // alert(this.userId);

    }
    back() {
       this._location.back();
       /// return this._location;
       // alert(951);
    }
}
