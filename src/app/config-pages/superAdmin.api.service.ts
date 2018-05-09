import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../config-pages/app.global';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class SuperAdminApiService {

// error handle
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: Http, private _global: AppGlobals ) {}


  // Add Category API
  url_addCategoryApi(data) {
    return this.http
    .post(this._global.baseAPIUrl + 'Category/addcategory', data)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // Get Category API
  url_getCategoryApi() {
    return this.http
    .get(this._global.baseAPIUrl + 'Category/getcategorylist?userid=' + this._global.g_userId)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
}
