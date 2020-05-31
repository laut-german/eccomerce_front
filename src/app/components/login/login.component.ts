import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	email = '';
	password = '';

	btnDisabled = false;
	constructor(private router: Router
		, private restApiService: RestApiService
		, private data: DataService) { }

	ngOnInit() {
	}

	validate() {
		if (this.email) {
			if (this.password) {
				return true;
			} else {
				this.data.error('Password is not entered');
			}
		} else {
			this.data.error('Email is not entered');
		}
	}


	async login() {
		try {
			this.btnDisabled = false;
			let rs = await this.restApiService.post('/accounts/login', {
				email: this.email,
				password: this.password
			});
			if (rs['success']) {
				localStorage.setItem('token', rs['token']);
				await this.data.getProfile();
				this.router.navigate(['/']);
			} else {
				this.data.error(rs['message']);
			}
		} catch (error) {
			this.data.error(error);
		}
	}
}
// sdf(){
// 	this.btnDisabled = false;
// 	this.restApiService.post('login', {
// 		email: this.email,
// 		password: this.password
// 	}).subscribe(
// 		(rs) => {
// 			if (rs['success']) {
// 				localStorage.setItem('token', rs['token']);
// 				this.data.getProfile();
// 				this.router.navigate(['/']);
// 			} else {
// 				this.data.error(rs['message']);
// 			}
// 		},
// 		(error) => {
// 			this.data.error(error['message']);
// 		}
// 	)
// }
