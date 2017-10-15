import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';

import { Restangular, RestangularModule } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]>{
    return this.restangular.all('promotions').getList();
  }
  getPromotion(id: number): Observable<Promotion>{
    return this.restangular.one('promotions',id).get();
  }
  getFeaturedDish(): Observable<Promotion>{
    return this.restangular.all('promotions').getList({featured: true}).map(promo => promo[0]);
      }

}
