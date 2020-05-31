import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
	category: any;
	categoryId: any;
	page = 1;
	constructor(private rest: RestApiService
		, private data: DataService
		, private activate: ActivatedRoute) { }

	ngOnInit() {
		this.activate.params.subscribe((rs)=>{
			this.categoryId = rs['id'];
		});
	}
	get lower() {
		return 10 * (this.page - 1) + 1;
	}

	get upper() {
		return Math.min(10 * this.page, this.category.totalProducts);
	}

	getProduct(event){
		if(event){
			this.categoryId = null;
		}
		this.rest.get(`home/category/${this.categoryId}/?page=${(this.page-1)}`)
		.then((rs)=>{
			if(rs['success']){
				this.category = rs;
			}else{

				this.data.error(rs['message']);
			}
			
		}).catch((err)=> this.data.error(err['message']))
	}
}
