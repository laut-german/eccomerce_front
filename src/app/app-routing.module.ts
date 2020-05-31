import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressComponent } from './components/address/address.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'register',
		component: RegistrationComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path:'cart',
		component:CartComponent
	},
	{
		path: 'categories',
		component: CategoriesComponent
	},
	{
		path: 'categories/:id',
		component: CategoryComponent
	},
	{
		path: 'product/:id',
		component: ProductDetailComponent
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'profile/settings',
		component: SettingsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'profile/address',
		component: AddressComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'profile/postproduct',
		component: ProductComponent
	},
	{
		path: 'profile/myproducts',
		component: MyProductsComponent
	},
	{
		path:'search',
		component:SearchComponent
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
