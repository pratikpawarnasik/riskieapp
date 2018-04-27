import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = 'http://localhost:4200/';
    readonly baseAPIUrl: string = 'http://localhost/riskie/index.php/';
    readonly profileFolderPathUrl: string = 'http://localhost/riskie/images/userimages/';
    userId = this.cookieService.get('userId');
    constructor(private cookieService: CookieService) {
        // alert(this.userId);
    }
}
