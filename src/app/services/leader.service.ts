import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { Restangular, RestangularModule } from 'ngx-restangular';



@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }
  getLeaders(): Observable<Leader[]>{
    return this.restangular.all('leaders').getList();

  }
  getFeatured(): Observable<Leader>{
    return this.restangular.all('leaders').getList({featured : true}).map(leader => leader[0]);

  }
}
