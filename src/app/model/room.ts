import { retry } from "rxjs/operator/retry";
import { GameService } from "../service/game.service";
export class Room {
	time	: number;
	start	: number;
	label	: string;
	cost	: string;
	group	: string;
	complete: number;
	reward	: number;
	upkeep	: number;
	actions : any;
	data	: any;
	constructor(private g : GameService)
	{
		this.time = new Date().getTime();
		this.data = this.g.data;
	}
	setup(o : any)
	{
		
	}
	plant(crop)
	{

	}
};	