import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
@Component({
	selector: 'app-my-products',
	templateUrl: './my-products.component.html',
	styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

	constructor(private rest: RestApiService, private data: DataService) { }
	products:any;
	async  ngOnInit() {
		try {
			let rs = await this.rest.get('/vendor/product');
			if(rs['success']){
				this.data.success(rs['mesasage']);
				this.products = rs['products'];
			}else{
				this.data.error(rs['message']);
			}
		} catch (error) {
			this.data.error(error['message']);
		}
	}

}
