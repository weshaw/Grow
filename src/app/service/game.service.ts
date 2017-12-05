import { Injectable, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { StorageService } from './store.service';
import { Room } from '../model/room';
import { GameClock } from '../model/clock';
import 'rxjs/Rx';
import { retry } from 'rxjs/operators/retry';


@Injectable()
export class GameService implements OnInit {
	data  : any;
	state : any;
	rooms : any;
	roomdata : any;
	time : number;
	clock	: GameClock;
	constructor(public store : StorageService, public http : Http) {
		this.clock = new GameClock(this);
		let state = this.store.get("grow") || {
			name : "player",
			credits : 200,
			score : 0,
			level : 0,
			time : 0,
			rooms : []
		};
		this.state = state;
		this.data = {};
		this.load(["rooms","crops","upgrades"]).then((data) => {
			Object.assign(this.data,data);
			console.log(data);

			this.init_game();
		});
		
	}
	ngOnInit()
	{
		console.log(this.state);
	}
	load(load_data : [string])
	{
		return new Promise((resolve, reject) => {
			var resp = {};
			var complete = 0;
			var done = function()
			{
				if(complete == load_data.length)
				{
					resolve(resp);
				}
			};
			for(let i=0,l=load_data.length;i<l;i++)
			{
				this.get_data(load_data[i]).subscribe((data) => {
					resp[load_data[i]] = data;
					complete ++;
					done();
				});
			};
		});
	}

	init_game()
	{
		console.log("LOADED", this.data);
		if(this.state.time == 0)
		{
			this.state.time = this.clock.gettime();
			this.save();
		}
		this.clock.start();
		
	}

	game_tick(t)
	{
		// have things subscribe to ticks
	}


	get(state_info_name)
	{
		if(state_info_name && this.state.hasOwnProperty(state_info_name))
		{
			return this.state[state_info_name];
		}
		return null;
	}
	save()
	{
		console.log("SAVE");
		return this.store.set("grow",this.state);
	}
	add_room(o,loading=false)
	{
		let room = new Room(this);

		if(typeof o == "string" && this.data.rooms[o])
		{
			o = this.data.rooms[o];
		}

		room.setup(o);
		console.log("ROOM",room);
		let save = false;
		// if(!room.paid)
		// {
		// 	let credits = this.state.credits - room.cost;
		// 	console.log("Room has not been paid for");
		// 	console.log(this.state.credits,room.cost);
		// 	console.log(credits);
		// 	if(credits<0)
		// 	{
		// 		return false;
		// 	}
		// 	this.state.credits = credits;
		// 	room.paid = true;
		// 	save = true;
		// }
		// if(!loading)
		// {
		// 	this.state.rooms.push({
		// 		time : room.time,
		// 		type : room.type,
		// 		paid : room.paid,
		// 	});
		// 	save = true;
		// }
		// this.rooms.unshift(room);
		// if(save)
		// 	{ this.save(); }

		return room;
	}
	get_data(type : string) {
		return this.http.get("/assets/"+type+".json")
			.map((res:Response) => res.json());
	}
	build_rooms_from_saved()
	{
		this.rooms = [];
		if(!this.state.rooms)
			{ this.state.rooms = []; }
		for(let i=0,l=this.state.rooms.length; i<l; i++)
		{
			this.add_room(this.state.rooms[i],true);
		}
		console.log(this.rooms);
	}
}
