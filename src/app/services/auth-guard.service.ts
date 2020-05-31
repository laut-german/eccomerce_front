import { Injectable } from '@angular/core';

import { Router,RouterStateSnapshot,ActivatedRouteSnapshot ,CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot ):boolean{
	if(localStorage.getItem('token')){
		return state.url.startsWith('/profile')?true:(this.router.navigate(['/']),false)
	}else{
		return state.url.startsWith('/profile')?(this.router.navigate(['/']),false):true;
	
	}
	
  }
}
