import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';
@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
	product = {
		title: '',
		price: 0,
		categoryId: '',
		description: '',
		product_picture: null
	}
	categories: any;
	btnDisabled = false;
	constructor(private rest: RestApiService, private data: DataService, private router: Router) { }

	async ngOnInit() {
		try {
			let rs = await this.rest.get('/home/category');
			if (rs['success']) {
				this.categories = rs['categories'];
			} else {
				this.data.error(rs['message']);
			}
		}catch (error) {
			this.data.error(error['message']);
		}
	}
	validate(product){
		if(product.title){
			if(product.price){
				if(product.categoryId){
					if(product.description){
						if(product.product_picture){
							return true;
						}else{
							this.data.error('Please select a product picture');
							return false;
						}

					}else{
						this.data.error('Please enter a description');
						return false;
					}
				}else{
					this.data.error('Plese select a category');
					return false;
				}
			}else{
				this.data.error('Please enter a price');
				return false;
			}
		}else{
			this.data.error('Please enter a title');
			return false;
		}
	}

	fileChange(event:any){
		this.product.product_picture = event.target.files[0];
	}

	async post(){
		this.btnDisabled = true;
		try{
			if(this.validate(this.product)){
				const form = new FormData();
				for(const key in this.product){
					if(this.product.hasOwnProperty(key)){
						if(key === 'product_picture'){
							form.append(
								'product_picture',
								this.product.product_picture,
								this.product.product_picture.name
							)
						}else{
							form.append(key,this.product[key]);
						}
					}
				}
				let rs = await this.rest.post('/vendor/product',form);
				if(rs['success']){
					this.router.navigate(['/profile/myproducts'])
					.then(()=>{this.data.success(rs['message'])})
					.catch((err)=> this.data.error(err))
				}else{
					this.data.error(rs['message']);
				}
			}
			
		}catch(error){
			this.data.error(error['message']);
		}
		this.btnDisabled = false;
	}
}
