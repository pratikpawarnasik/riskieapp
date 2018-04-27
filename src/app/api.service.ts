import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TestinServiceData, UserRegistration} from './config-pages/riskie-all-interface';
import { AppGlobals } from './config-pages/app.global';

@Injectable()
export class ApiService {

  // readonly ROOT_URL = 'http://siddhiglobal.net/acceptance/riskie_dev/index.php/';
  // readonly ROOT_URL = 'http://localhost/riskie/index.php/';
// error handle
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: Http, private _global: AppGlobals ) {}
// Testing API
  url_getPosts(): Observable<TestinServiceData[]> {
      return this.http
      .get(this._global.baseAPIUrl + 'user/getuserinfo?id=11')
      .map((response: Response) => {
        return <TestinServiceData[]>response.json();
      })
      .catch(this.handleError);
  }
// Registration API
  url_userRegistrationFun(data, header): Observable<UserRegistration[]> {
    return this.http
    .post(this._global.baseAPIUrl + 'user/userregistration', data)
    .map((response: Response) => {
      return <UserRegistration[]>response.json();
    })
    .catch(this.handleError);
  }
// Login API
  url_userLoginFun(data): Observable<UserRegistration[]> {
    return this.http
    .post(this._global.baseAPIUrl + 'user/checklogindetails', data)
    .map((response: Response) => {
      return <UserRegistration[]>response.json();
    })
    .catch(this.handleError);
  }
  // GET Category list API
  // url_getCategoryAPI(data): Observable<UserRegistration[]> {
  //   return this.http
  //   .post(this.ROOT_URL + 'user/checklogindetails', data)
  //   .map((response: Response) => {
  //     return <UserRegistration[]>response.json();
  //   })
  //   .catch(this.handleError);
  // }



}
