import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	btnDisables = false;
	handler: any;
	quantities = [];
	constructor(private rest: RestApiService, private data: DataService, private router: Router) { }

	ngOnInit() {
		this.cartItems().forEach(data => {
			this.quantities.push(1);
		});
		this.handler = StripeCheckout.configure({
			key:environment.stripesKey,
			image:'../../../assets/img/logo.png',
			locale:'auto',
			token: async stripeToken =>{
				let products;
				products = [];
				this.cartItems().forEach((d,index) => {
					products.push({
						product:d['_id'],
						quantity:this.quantities[index]
					})
				});
			}
		});
	}
	trackByCartItems(index: number, item: any) {
		return item._id;
	}

	cartItems() {
		return this.data.getCart();
	}

	cartTotal() {
		let total = 0;
		this.cartItems().forEach((data, index) => {
			total += data.price * this.quantities[index];
		});
		return total;
	}
}
