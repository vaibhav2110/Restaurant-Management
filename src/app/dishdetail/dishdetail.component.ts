import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'

import { Location } from '@angular/common';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

import { visibility,expand, flyInOut } from '../animations/app.animations';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    visibility(),
    expand(),
    flyInOut()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishCopy= null;
  dishIds: Number[];
  commentform: FormGroup;
  comment: Comment;
  prev: Number;
  next: Number;
  errMess: string;

  visibility = 'shown';

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
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL) {
       this.createForm(); }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
   this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errMess => { this.dish = null; this.errMess = <any>errMess; });
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
    this.dishCopy.comments.push(this.comment);
    this.dishCopy.save().subscribe(dish => this.dish = dish);
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
