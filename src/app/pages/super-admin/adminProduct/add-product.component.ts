import { Component, OnInit } from '@angular/core';
import { AddProductParam } from '../../../config-pages/riskie-all-interface';
import { AppGlobals } from '../../../config-pages/app.global';
import { SuperAdminApiService } from '../../../config-pages/superAdmin.api.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
    addProduct: AddProductParam;
    catResponse: any;
    categoryList: any;
    states: any;
  constructor(private supAdminapiSerivce: SuperAdminApiService, private _global: AppGlobals) { }


  ngOnInit() {
    this.states = [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
      'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
      'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
      'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
      'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
      'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    this.addProduct = {
      productName: 'Pratik',
      categoryName: '',
    };
    if (this._global.g_isAdmin !== '1') {
      alert('You have not Super Admin Access.');
      this._global.back();
    }
    this.supAdminapiSerivce.url_getCategoryApi().
    subscribe(
      resultArray => {this.catResponse = resultArray;
        if (this.catResponse.status === 200) {
         this.categoryList = this.catResponse.catdata;
         console.log(this.categoryList);

        } else {
          alert(this.catResponse.message);
        }
      },
        //  subscribe(
        //         resultArray => this.getResponse = resultArray,
          error => console.log('Error :: ' + error ));

  }
  submitProductForm() {
    alert(1);
  }
  log() {
    alert(321);
  }
  backClicked() {
    this._global.back();
  }
}
