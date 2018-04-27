// Angular library
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
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
import { ApiService } from './api.service';
import { UserProductSearchComponent } from './pages/user/user-product/user-product-search.component';
import { UserApiService } from './pages/user/user.api';
import { ProductDetailComponent } from './pages/user/user-product/product-detail.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { AccountComponent } from './pages/user/profile/account.component';
import { AppGlobals } from './config-pages/app.global';
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
    AccountComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthguardGuard, UserService,
    CookieService,
    ApiService,
    UserApiService,
    AppGlobals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
