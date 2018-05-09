import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../config-pages/app.global';
import { ChangePass, BillingProperty } from '../config-pages/riskie-all-interface';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserApiService {

// error handle
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: Http, private _global: AppGlobals ) {}

  // GET Category list API service no.7 as per document
  url_getCategoryAPI() {
    return this.http
    .get(this._global.baseAPIUrl + 'Category/getcategorylist?userid=' + this._global.g_userId )
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
   // GET Product-Category list API service no.10 as per document
   url_getProductByCategoryAPI(categoryId) {
    return this.http
    .get(this._global.baseAPIUrl + 'Product/getproductlistbycategory?userid=' + this._global.g_userId + '&categoryid=' + categoryId)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // GET Product-Category list API service no.11 as per document
  url_getProductDetailAPI(productId) {
    return this.http
    .get(this._global.baseAPIUrl + 'Product/getproductinfobyid?userid=' + this._global.g_userId + '&productid=' + productId)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // GET Product-Category list API service no.5 as per document
  url_getProfileDetailAPI(userId) {
    return this.http
    .get(this._global.baseAPIUrl + 'user/getuserinfo?userid=' + userId )
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // Profile update API
  url_updateProfileDetailAPI(data) {
    return this.http
    .post(this._global.baseAPIUrl + 'user/updateuserinfo', data)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // GET Account details API service no.24 as per document
    url_getAccountDetailAPI(userId) {
      return this.http.get(this._global.baseAPIUrl + 'user/getuserplandtl?userid=' + userId )
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
    }
   // Profile update API service no.4
   url_changePasswordAPI(passData, httpOptions): Observable<ChangePass> {
    return this.http.put(this._global.baseAPIUrl + 'user/changepassword', passData)
   // return this.http.put(this._global.baseAPIUrl + 'user/changepassword', passData, { headers: httpOptions })
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // Billing Data update API
  url_postBillingDetailAPI(data): Observable<BillingProperty> {
    return this.http
    .post(this._global.baseAPIUrl + 'user/saveorderdetail', data)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }

}
