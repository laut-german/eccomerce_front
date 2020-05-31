import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	name = '';
	email = '';
	password = '';
	password1 = '';
	btnDisabled = false;
	isSeller = false;
	constructor(
		private router: Router
		, private restApiService: RestApiService
		, private dataService: DataService
	) { }

	ngOnInit() {
	}

	validate() {
		if (this.name) {
			if (this.email) {
				if (this.password) {
					if (this.password1) {
						if (this.password == this.password1) {
							return true;
						} else {
							this.dataService.error('Passwords do not match');
						}
					} else {
						this.dataService.error('Confirmation password is not entered');
					}

				} else {
					this.dataService.error('Password is not entered');
				}
			} else {
				this.dataService.error('Email is not entered');

			}

		} else {
			this.dataService.error('Name is not entered');
		}
	}
	async register() {
		try {
			this.btnDisabled = true;
			let rs = await this.restApiService.post('/accounts/signin', {
				name: this.name
				, email: this.email
				, password: this.password
				, isSeller: this.isSeller
			});
			if (rs['success']) {
				localStorage.setItem('token', rs['token']);
				await this.dataService.getProfile();
				this.router.navigate(['profile/address'])
				.then(()=>{
					this.dataService.success('Registration Succesful. Please enter your shipping address below.');
				}).catch(error=>{
					this.dataService.error(error)
				})
				
				
			} else {
				this.dataService.error(rs['message']);
			}
			
		} catch (error) {
			this.dataService.error(error);
		}
		this.btnDisabled = false;
	}
}
