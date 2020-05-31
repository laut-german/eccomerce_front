import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';
@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	btnDisabled = false;
	currentSettings: any;
	constructor(private rest: RestApiService, private data: DataService) { }

	async ngOnInit() {
		try {
			if (!this.data.user) {
				 this.data.getProfile();
				this.currentSettings = Object.assign(
					{ newPwd: '', pwdCondfirm: '' },
					this.data.user)
			} else {
				this.currentSettings = Object.assign(
					{ newPwd: '', pwdCondfirm: '' },
					this.data.user)
			}
		} catch (error) {
			this.data.error(error);
		}

	}

	validate(settings) {
		if (settings['name']) {
			if (settings['email']) {
				if (settings['newPwd']) {
					if (settings['pwdConfirm']) {
						if (settings['newPwd'] === settings['pwdConfirm']) {
							return true;
						} else {
							this.data.error('Passwords doesn\'t match');
						}
					} else {
						this.data.error('Please enter confirm password');
					}
				} else {
					if (!settings['pwdConfirm']) {
						return true;
					} else {
						this.data.error('Please enter new Password');
					}

				}
			} else {
				this.data.error('Please enter your email');
			}
		} else {
			this.data.error('Please enter your name');
		}
	}

	async update() {
		try {
			console.log('isSeller: '+this.currentSettings['isSeller']);
			this.btnDisabled = true;
			if (this.validate(this.currentSettings)) {
				let rs = await this.rest.post('/accounts/profile', {
					name: this.currentSettings['name']
					, email: this.currentSettings['email']
					, password: this.currentSettings['newPwd']
					, isSeller: this.currentSettings['isSeller']
				});
				console.log('update -> rs[success]: '+rs['success'])+'data';
				rs['success'] ? (this.data.success(rs['message']),this.data.getProfile()) : this.data.error(this.data['message']);
				console.log('update -> data.message: '+this.data.message);
			}
		} catch (error) {
			this.data.error(error);
		}
		this.btnDisabled = false;
	}

}
