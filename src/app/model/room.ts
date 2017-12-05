import { retry } from "rxjs/operator/retry";
import { GameService } from "../service/game.service";
import { Crop } from "./crop";

export class Room {
	built	: number;
	label	: string;
	cost	: string;
	group	: string;
	time	: number;
	reward	: number;
	upkeep	: number;
	actions : any;
	data	: any;
	crop	: Crop;
	constructor(private g : GameService)
	{
		this.built = new Date().getTime();
		this.data = this.g.data;
	}
	setup(o : any)
	{
		
	}
	plant(crop)
	{
		this.crop = new Crop(this.g);

		let o = this.g.data.crops[crop]||false;
		if(o)
		{
			this.crop.setup(o);
			this.crop.plant();
		}
	}
};	