import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: Number[];
  prev: Number;
  next: Number;
  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
     .switchMap(( params: Params )=>this.dishService.getDish(+params['id']))
     .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)});
  }
  goBack(): void{
    this.location.back();
  }
  setPrevNext(dishId){
     let index = this.dishIds.indexOf(dishId);
     this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
     this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];

  }

}
