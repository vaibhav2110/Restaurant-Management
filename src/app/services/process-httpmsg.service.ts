import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw'

@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }
  public extractData(res: Response){
  	let data = res.json();
  	console.log(data);
  	return data || {};
  }

  public handleError(error: Response | any){
  	let errMsg : string;
  	if(error instanceof Response){
  		const body = error.json() || '';
  		const err = body.error || JSON.stringify(body);
  		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  	}
  	else{
  		errMsg = error.message ? error.message : error.toString();
  	}
  	console.error(errMsg);
  	return Observable.throw(errMsg);
  }

}
