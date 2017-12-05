import { Injectable } from '@angular/core';
import { retry } from "rxjs/operators/retry";

import { GameService } from "../service/game.service";

@Injectable()
export class GameClock
{
	last_tick 	: number;
	ticks 		: number;
	tick_time 	: number;
	timer		: any;
 	g 			: GameService
	started		: number;
	day_length	: number;
	day			: number;
	hour		: number;
	minute		: number;
	game_start	: number;
	constructor(g)
	{
		this.g 		= g;
		this.ticks	= 0;
		this.day	= 0;
		this.hour	= 0;
		this.minute	= 0;
		
		this.tick_time	= 1000;
		this.day_length = 5 * 60 * 1000;
		this.started	= this.gettime();
	}

	tick()
	{
		this.stop();
		let time = this.gettime();
		let delta = (time - this.last_tick) - this.tick_time;

		this.ticks++;
		this.last_tick = time;

		this.gametime();
		// update game state
		this.g.game_tick(time);
		// wait for next time
		this.timer = setTimeout(() => { this.tick(); },this.tick_time - delta);
	}

	gettime()
		{ return new Date().getTime(); }
	stop()
		{ clearTimeout(this.timer); }
	start()
	{
		this.game_start = this.g.state.time;
		let time = this.gettime() - this.tick_time;
		this.last_tick = time;
		this.tick();
	}
	gametime()
	{
		let gametime = this.last_tick - this.game_start;
		let day = (gametime / this.day_length);
		let hour = (day - this.day);
		if(hour>1)
			{ hour = 0; }
		hour = (hour*24)+1;

		this.day 		= Math.floor(day);
		this.hour 		= Math.floor(hour);
		this.minute 	= Math.floor((hour-this.hour)*60);
	}
}