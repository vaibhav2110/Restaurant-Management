import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'

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
  commentform: FormGroup;
  comment: Comment;
  prev: Number;
  next: Number;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.'
    },
    
    'comment': {
      'required':      'Comment is required.'
    }
  };
  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder) {
       this.createForm(); }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
     .switchMap(( params: Params )=>this.dishService.getDish(+params['id']))
     .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)});
  }
  createForm(){
    this.commentform = this.fb.group({
      rating:1,
      comment:['',[Validators.required]],
      author:['',[Validators.required, Validators.minLength(2)]]
    });
    this.commentform.valueChanges
        .subscribe((data)=>this.onValueChanged(data));
    this.onValueChanged();
  }
  goBack(): void{
    this.location.back();
  }
  setPrevNext(dishId){
     let index = this.dishIds.indexOf(dishId);
     this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
     this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];

  }
  onSubmit(){
    this.comment = this.commentform.value;
    let d = new Date();
    let n = d.toISOString();
    this.comment.date = n;
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentform.reset({
      rating: 1,
      comment:'',
      author: ''
    });
  }
  onValueChanged(data?: any){
    if(!this.commentform){return;}
    const form = this.commentform;
    for(const fields in this.formErrors){
       this.formErrors[fields]='';
       const control = form.get(fields);
       if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[fields];
          for(const key in control.errors){
            this.formErrors[fields] += messages[key] + ' ';
          }
       }
    }
  }

}
