import { GameService } from "../service/game.service";

export class Crop {
	label	: string;
	started	: number;
	cost	: number;
	complete: number;
	reward	: number;
	upkeep	: number;
	growth	: number;
	options : any;
	constructor(private g : GameService)
	{
		
		
	}
	setup(o : any)
	{
		this.options = o;
		for (const key in o) {
			if (o.hasOwnProperty(key) && this[key]) {
				this[key] = o[key];
			}
		}
	}
	plant()
	{
		// add bill for planting

		this.started 	= new Date().getTime();
		this.complete 	= (this.options.time || 3) * this.g.clock.day_length;
	}
	harvest()
	{
		// pay harvest

	}
	tick()
	{
		// add bill for upkeep

		// mark tick
		let time = this.g.clock.tick_time;
		let s = time - this.started;
		let c = this.complete - time;
		console.log(s,c);
		//this.growth = 
	}
};	