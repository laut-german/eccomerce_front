import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	query = '';
	page;
	content: any;
	constructor(private rest: RestApiService, private data: DataService, private activate: ActivatedRoute) { }

	ngOnInit() {
		this.activate.params.subscribe((rs) => {
			this.query = rs['query'];
			this.page = 1;
			this.getProducts();

		})
	}

	get lower(){
		return 1 + this.content.hitsPerPage *  this.content.page;
	}

	get upper(){
		return Math.min(this.content.hitsPerPage * (this.content.page+1),this.content.nbHits);
	}
	async getProducts() {
		try {
			let rs = await this.rest.get(`/search/?query=${this.query}&page=${this.page - 1}`)
			if (rs['success']) {
				this.content = rs['content'];
			} else {
				this.data.error(rs['message']);
			}
		} catch (error) {
			this.data.error(error['message']);
		}

	}
}
