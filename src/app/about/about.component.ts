import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { expand, flyInOut } from '../animations/app.animations'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    expand(),
    flyInOut(),

    ]
})
export class AboutComponent implements OnInit {

  leader: Leader[];
  constructor(private leaderService: LeaderService,
  	@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  	this.leaderService.getLeaders().subscribe(leader => this.leader = leader);
  }

}
