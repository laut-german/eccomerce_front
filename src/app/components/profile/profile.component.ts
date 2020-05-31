import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {RestApiService} from '../../services/rest-api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public data:DataService,private rest:RestApiService) { }

  async ngOnInit() {
	  if(!this.data.user){
		  this.data.getProfile();
	  }
  }

}
