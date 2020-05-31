import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	categories: any;
	newCategory = '';
	btnDisabled = false;
	constructor(private rest: RestApiService,
		private data: DataService) { }

	async ngOnInit() {
		try {
			let rs = await this.rest.get('/home/category');
			if (rs['success']) {
				this.categories = rs['categories'];
			} else {
				this.data.error(rs['message']);
			}
		} catch (error) {
			this.data.error(error['message']);
		}

	}

	async addCategory() {
		this.btnDisabled = true;
		try {
			let rs = await this.rest.post('/home/category',
				{name: this.newCategory });
			if (rs['success']) {
				this.data.success(rs['message']);
			} else {
				this.data.error(rs['message']);
			}
		} catch (error) {
			this.data.error(error['message']);
		}
		this.btnDisabled=false;
	}

}
