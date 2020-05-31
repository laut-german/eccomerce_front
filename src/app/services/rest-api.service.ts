import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http:HttpClient) { }

  getHeaders(){
	  let token = localStorage.getItem('token');
	  return token ? new HttpHeaders().set('authorization',token):null;
	}


  get(endpoint:any){
	return this.http.get(environment.url+endpoint,{headers:this.getHeaders()}).toPromise();
	 // return this.http.get(environment.url+'/accounts/'+endpoint,{headers:this.getHeaders()}).pipe(map((res)=>res));
  }

  post(endpoint:string,body:any){
	
	  let headers = endpoint=='/accounts/login'? new HttpHeaders():this.getHeaders();
	
	  return this.http.post(environment.url+endpoint,body,{headers:headers}).toPromise();
	  //return this.http.post(environment.url+'/accounts/'+endpoint,body,{headers:headers}).pipe(map((res)=>res));

  }


}
