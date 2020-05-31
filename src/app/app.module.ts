import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';


import {RestApiService} from './services/rest-api.service';
import{AuthGuardService} from './services/auth-guard.service';

import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddressComponent } from './components/address/address.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    CategoriesComponent,
    ProductComponent,
    MyProductsComponent,
    ProductDetailComponent,
    CategoryComponent,
    SearchComponent,
    CartComponent
  ],
  imports: [
    BrowserModule
	,AppRoutingModule
	,NgbModule
	,FormsModule
	,HttpClientModule


  ],
  providers: [RestApiService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
