import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../../../config-pages/superAdmin.api.service';
import { AppGlobals } from '../../../config-pages/app.global';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html'
})
export class AdminAddCategoryComponent implements OnInit {
  categoryForm: any;
    masterCategory: any;
    catResponse: any;
    fileToUpload: File = null;
    imageUrl = 'assets/images/user_profile.png';
    responseMessage: any = '';
  constructor(private supAdminapiSerivce: SuperAdminApiService, private _global: AppGlobals) { }

  ngOnInit() {
    if (this._global.g_isAdmin !== '1') {
      alert('You have not Super Admin Access.');
      this._global.back();
    }
    this.masterCategory = {
      categoryName: '',
    };
  }
  backClicked() {
    this._global.back();
  }
  // updload category image
  uploadImg(file: FileList) {
    //  console.log(file);
      this.fileToUpload = file.item(0);
      // SHOW image preview
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
        };
      reader.readAsDataURL(this.fileToUpload);
    }
  // Add submit category file
  // log(asdf) {
  //   alert(321321);
  // }
  submitAddCatForm() {
    this.responseMessage = 'Category saving...';
    const formData: FormData = new FormData();
      formData.append('catname', this.masterCategory.categoryName);
      formData.append('userid', this._global.g_userId);
      formData.append('catimage', this.fileToUpload);
      // console.log(formData);
      this.supAdminapiSerivce.url_addCategoryApi(formData).
      subscribe(
        resultArray => {this.catResponse = resultArray;
          if (this.catResponse.status === 200) {
            // this.user.setUserLoggedIn();
           // console.log(this.loginResponse);
           // window.location.reload();
           alert(this.catResponse.message);
            this.responseMessage = this.catResponse.message;
            this.backClicked();
           // this.categoryForm.reset();
          } else {
            this.responseMessage = this.catResponse.message;
            alert(this.catResponse.message);
          }
        },
          //  subscribe(
          //         resultArray => this.getResponse = resultArray,
            error => console.log('Error :: ' + error ));
  }

}
