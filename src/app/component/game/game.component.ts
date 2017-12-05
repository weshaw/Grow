import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import { UiService } from '../../service/ui.service';
import { retry } from 'rxjs/operator/retry';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	rooms : any;

	constructor(public g : GameService, public ui : UiService) { }

	ngOnInit()
	{
	}
	newroom(type)
	{

	}
	buy_room(name)
	{
		if(this.g.data.rooms[name])
		{
			this.g.add_room(name);
		}
	}
	room_names()
	{
		let r = [];
		if(this.g.data.rooms)
		{
			r = Object.keys(this.g.data.rooms);	
		}

		return r;
	}
}
