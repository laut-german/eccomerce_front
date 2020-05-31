import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';
@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
	btnDisabled = false;
	currentAddress: any;
	constructor(private rest: RestApiService, private data: DataService) { }

	async ngOnInit() {
		try {
			let rs = await this.rest.get('/accounts/address');
			if (JSON.stringify(rs['address']) === '{}' && this.data.message === '') {
				this.data.warning('You have not entered yout shipping address. Please enter your shipping address');
			}
			this.currentAddress = rs['address'];
		} catch (error) {
			this.data.error(error);
		}
	}

	async updateAddress() {
		this.btnDisabled = true;
		try {
			let rs = await this.rest.post('/accounts/address', this.currentAddress);
			rs['success'] ? (this.data.success(rs['message']), await this.data.getProfile()) : this.data.error(rs['message']);
		} catch (error) {
			this.data.error(error);
		}

		this.btnDisabled = false;
	}

}
