import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }
  getLeaders():Leader[]{
  	return LEADERS;
  }
  getFeatured(): Leader{
  	return LEADERS.filter((leader)=>(leader.featured))[0];
  }
}
