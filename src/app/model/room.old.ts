import { retry } from "rxjs/operator/retry";

export class Room {
	label : string;
	type : string;
	group : string;
	cost : number;
	reward : number;
	upkeep : number;
	paid : boolean;
	data : any;
	time : number;
	buttons : any;
	alive : number;
	tocomplete : number;
	constructor(o,rooms)
	{
		this.time = new Date().getTime();
		this.type = o.type;
		let room = rooms[this.type];
		if(!room)
		{
			this.type = "invalid room";
			return;
		}
		this.label = "not set";
		this.group = "not set";
		room.paid = o.paid||false;
		this.alive = o.alive||0;
		this.tocomplete = 0;
		this.paid = false;
		this.cost = 100;
		this.reward = 0;
		this.upkeep = 0;
		this.data = {};
		for (const key in room) {
			if (room.hasOwnProperty(key)) {
				const item = room[key];
				if(typeof this[key] !== "undefined")
				{
					this[key] = item;
				}
				else if(key == "actions")
				{
					this.buttons = [];
					for (const name in item) {
						if (item.hasOwnProperty(name)) {
							let a = item[name];
							a.name = key;
							this.buttons.push(a);
						}
					}
				}
				else
				{
					this.data[key] = item;
				}
			}
		}
	}
	sell()
	{
		return Math.round(this.cost/3);
	}
	harvest()
	{
		if(this.alive == this.tocomplete)
		{
			return this.reward;
		}
		else if(this.alive > this.tocomplete)
		{
			let dif = this.tocomplete - this.alive;
			dif = dif*10;

			return this.reward - (this.reward * (dif/100));
		}
		return Math.round(this.cost/3);
	}
	plant()
	{
		this.alive = 0;
		return this;
	}
};