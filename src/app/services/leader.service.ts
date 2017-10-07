import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';



@Injectable()
export class LeaderService {

  constructor() { }
  getLeaders(): Promise<Leader[]>{
    return Observable.of(LEADERS).delay(2000).toPromise();

  }
  getFeatured(): Promise<Leader>{
    return Observable.of(LEADERS.filter((leader)=>(leader.featured))[0]).delay(2000).toPromise();

  }
}
