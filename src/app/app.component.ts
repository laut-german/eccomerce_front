import { Component } from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm='';
  isCollapsed = false;

  constructor(public data:DataService,private router:Router){
	  this.data.getProfile();
	  this.data.cartItems = this.data.getCart().length;
  }
	get token(){
		return localStorage.getItem('token');
	}

  collapse(){
	  this.isCollapsed=true;
  }
  
  closeDropdown(dropdown){
	  dropdown.close();
  }

  logout(){
	localStorage.clear();
	this.data.cartItems = 0;
	this.data.user = [];
	this.router.navigate(['']);
  }

  search(){
	if(this.searchTerm){
		this.router.navigate(['search',{query:this.searchTerm}]);
	}
  }
}
