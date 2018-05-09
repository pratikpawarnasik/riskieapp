import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProductParam } from '../../../config-pages/riskie-all-interface';
import { AppGlobals } from '../../../config-pages/app.global';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator } from '@angular/material';
import { SuperAdminApiService } from '../../../config-pages/superAdmin.api.service';



@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html'
})
export class AdminProductComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    catResponse: any;
    responseMessage = 'Product not available';
    categoryList: any;

    displayedColumns = ['id', 'catname', 'totalProd'];
  constructor(private supAdminapiSerivce: SuperAdminApiService, private _global: AppGlobals) { }

  ngOnInit() {
    if (this._global.g_isAdmin !== '1') {
      alert('You have not Super Admin Access.');
      this._global.back();
    }
    this.supAdminapiSerivce.url_getCategoryApi().
    subscribe(
      resultArray => {this.catResponse = resultArray;
        if (this.catResponse.status === 200) {
         this.categoryList = this.catResponse.catdata;
         this.categoryList = new MatTableDataSource(this.categoryList);
        // console.log(this.categoryList);

         this.categoryList.sort = this.sort;
         this.categoryList.paginator = this.paginator;
        } else {
          this.responseMessage = this.catResponse.message;
          alert(this.catResponse.message);
        }
      },
        //  subscribe(
        //         resultArray => this.getResponse = resultArray,
          error => console.log('Error :: ' + error ));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.categoryList.filter = filterValue;
  }
  backClicked() {
    this._global.back();
  }

}
