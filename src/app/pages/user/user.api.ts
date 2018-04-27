import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../../config-pages/app.global';

@Injectable()
export class UserApiService {

  // readonly ROOT_URL = 'http://siddhiglobal.net/acceptance/riskie_dev/index.php/';
// error handle
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: Http, private _global: AppGlobals ) {}

  // GET Category list API service no.7 as per document
  url_getCategoryAPI(userid) {
    return this.http
    .get(this._global.baseAPIUrl + 'Category/getcategorylist?userid=' + userid )
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
   // GET Product-Category list API service no.10 as per document
   url_getProductByCategoryAPI(userId, categoryId) {
    return this.http
    .get(this._global.baseAPIUrl + 'Product/getproductlistbycategory?userid=' + userId + '&categoryid=' + categoryId)
    .map((response: Response) => {
      return response.json();
    })
    .catch(this.handleError);
  }
  // GET Product-Category list API service no.11 as per document
  url_getProductDetailAPI(userId, productId) {
    return this.http
    .get(this._global.baseAPIUrl + 'Product/getproductinfobyid?userid=' + userId + '&productid=' + productId)
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
      return this.http
      .get(this._global.baseAPIUrl + 'user/getuserplandtl?userid=' + userId )
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
    }

}
