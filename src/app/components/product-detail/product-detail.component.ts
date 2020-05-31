import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../services/rest-api.service';
import { DataService } from '../../services/data.service';
@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	product: any;
	myReview = {
		title: '',
		description: '',
		rating: 0
	}
	btnDisabled = false;
	constructor(private router: Router
		, private rest: RestApiService
		, private activate: ActivatedRoute
		, private data: DataService) { }

	ngOnInit() {
		this.activate.params.subscribe((res) => {
			this.rest.get(`/accounts/products/${res['id']}`).then(
				(data) => {
					if (data['success']) {
						this.product = data['product'];
					} else {
						this.router.navigate(['/']);
					}

				}
			).catch((error) => { this.data.error(error['message']) });
		});
	}
	async postReview() {
		this.btnDisabled = true;
		try {
			let rs = await this.rest.post('home/review',{
				productId:this.product._id,
				title:this.myReview.title,
				description:this.myReview.description,
				rating:this.myReview.rating
			} );
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

	addCart(){
		this.data.addCart(this.product)
		?this.data.success('Product added SUccesfully to the cart')
		:this.data.error('The prodcut has already been added to the cart');
	}
}
