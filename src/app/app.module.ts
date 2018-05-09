// Angular library
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './pages/user/welcome/welcome.component';
import { HomeComponent } from './pages/general/home/home.component';
import { ContactusComponent } from './pages/general/contactus/contactus.component';
import { ProductsComponent } from './pages/general/products/products.component';
import { SolutionComponent } from './pages/general/solution/solution.component';
import { CustomerComponent } from './pages/general/customer/customer.component';
import { AboutusComponent } from './pages/general/aboutus/aboutus.component';
import { ToolsComponent } from './pages/general/tools/tools.component';
import { AuthguardGuard } from './config-pages/authguard.guard';
import { UserService } from './config-pages/user.service';
import { MasterHeaderComponent } from './header/master-header.component';
import { UserProductComponent } from './pages/user/user-product/user-product.component';
import { UserToolsComponent } from './pages/user/user-tools/user-tools.component';
import { ApiService } from './config-pages/header-api.service';
import { UserProductSearchComponent } from './pages/user/user-product/user-product-search.component';
import { UserApiService } from './config-pages/user.api.service';
import { ProductDetailComponent } from './pages/user/user-product/product-detail.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AccountComponent } from './pages/user/profile/account.component';
import { AppGlobals } from './config-pages/app.global';
import { PlansComponent } from './pages/user/plans/plans.component';
import { FooterComponent } from './footer/footer.component';
import { AddProductComponent } from './pages/super-admin/adminProduct/add-product.component';
import { AdminCategoryComponent } from './pages/super-admin/adminCategory/admin-category.component';
import { AdminProductComponent } from './pages/super-admin/adminProduct/admin-product.component';
import { AdminAddCategoryComponent } from './pages/super-admin/adminCategory/admin-add-category.component';
import { SuperAdminApiService } from './config-pages/superAdmin.api.service';
import { NgxPayPalModule } from 'ngx-paypal';
// import {MatTableModule, MatSortModule} from '@angular/material';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { SidebarComponent } from './pages/super-admin/sidebar/sidebar.component';
import { PaypalComponent } from './paypal/paypal.component';
import { PymentStatusComponent } from './pages/user/plans/paymentstatus.component';


const appRoutes: Routes = [
  // General URL
  { path: 'home', component: HomeComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'tools', component: ToolsComponent },
  // User Urls
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthguardGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'account', component: AccountComponent },
  { path: 'search-product', component: UserProductSearchComponent },
  { path: 'user-product/:categoryId', component: UserProductComponent },
  { path: 'product-detail/:productId', component: ProductDetailComponent },
  { path: 'plans', component: PlansComponent },
  // Super Admin Pages
  { path: 'add-product', component: AddProductComponent },
  { path: 'admin-category', component: AdminCategoryComponent },
  { path: 'add-category', component: AdminAddCategoryComponent },
  { path: 'admin-product', component: AdminProductComponent },
  { path: 'paypal', component: PaypalComponent },
  { path: 'payment/:status', component: PymentStatusComponent },

 // { path: 'hero/:id', component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class DemoMaterialModule {}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    HomeComponent,
    ContactusComponent,
    ProductsComponent,
    SolutionComponent,
    CustomerComponent,
    AboutusComponent,
    ToolsComponent,
    MasterHeaderComponent,
    UserProductComponent,
    UserToolsComponent,
    UserProductSearchComponent,
    ProductDetailComponent,
    ProfileComponent,
    AccountComponent,
    PlansComponent,
    FooterComponent,
    AddProductComponent,
    AdminCategoryComponent,
    AdminAddCategoryComponent,
    AdminProductComponent,
    SidebarComponent,
    PaypalComponent,
    PymentStatusComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, // { enableTracing: true } // <-- debugging purposes only
    ),
    // ReactiveFormsModule,
    MatSortModule,
      MatTableModule,
     BrowserAnimationsModule,
     MatCheckboxModule,
     MatButtonModule,
     MatPaginatorModule,
     MatButtonModule,
     DemoMaterialModule,
    MatInputModule,
    MatRippleModule,
    NgxPayPalModule
  ],
  providers: [
    AuthguardGuard, UserService,
    CookieService,
    ApiService,
    UserApiService,
    AppGlobals,
    SuperAdminApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
