import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import { UiService } from '../../service/ui.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(public g : GameService, public ui : UiService) { }

  ngOnInit() {
	}
	
  time()
  {
		let time = this.g.clock.hour;
		let am = "am";
		let minute = "00";
		if(time > 12)
		{
			time-=12;
			am = "pm";
		}
		if(this.g.clock.minute>=30)
		{
			minute = "30";
		}
		return time+":"+minute+am;
  }
}
