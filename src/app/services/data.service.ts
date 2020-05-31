import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from './rest-api.service';
@Injectable({
	providedIn: 'root'
})
export class DataService {
	message = '';
	messageType = 'Danger';
	user: any;
	cartItems = 0;
	constructor(private router: Router, private rest: RestApiService) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.message = '';
			}
		})
	}

	error(message) {
		this.messageType = 'danger';
		this.message = message;
	}
	success(message) {
		this.messageType = 'success';
		this.message = message;
	}
	warning(message) {
		this.messageType = 'warning';
		this.message = message;
	}

	async getProfile() {
		try {
			let rs = await this.rest.get('/accounts/profile');
			if (rs['success']) {
				this.user = rs['user'];
			}
		} catch (error) {
			this.error(error);
		}

	}

	getCart() {
		let cart = localStorage.getItem('cart');
		return cart ? JSON.parse(cart) : [];
	}

	addCart(item: string) {
		let cart: any = this.getCart();
		if (cart.find((data) => { JSON.parse(item) === JSON.parse(data) })) {
			return false
		} else {
			cart.push(item);
			this.cartItems++;
			localStorage.setItem('cart', JSON.stringify(cart));
			return true;
		}
	}

	clearCart() {
		this.cartItems = 0;
		localStorage.setItem('cart', '[]');
	}

	removeItemCart(item: string) {
		let cart: any = this.getCart();
		if (cart.find((data) => { JSON.parse(data) === JSON.parse(item) })) {
			cart = cart.filter((data) => { JSON.parse(data) !== JSON.parse(item) });
			localStorage.setItem('cart', JSON.stringify(cart));
			this.cartItems--;
		}
	}
}
