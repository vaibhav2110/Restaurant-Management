import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import { expand, flyInOut } from '../animations/app.animations'

import { LeaderService } from '../services/leader.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    expand(),
    flyInOut()
    ]
})
export class HomeComponent implements OnInit {

	dish:Dish;
	promotion:Promotion;
  leader:Leader;
  dishErrMess: string;

  constructor(private dishService: DishService,
  	private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL){ }

  ngOnInit() {
  	this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.dishErrMess = <any>errmess );
  	this.promotionService.getFeaturedDish().subscribe(promo => this.promotion = promo);
    this.leaderService.getFeatured().subscribe(leader => this.leader = leader);
  }

}
