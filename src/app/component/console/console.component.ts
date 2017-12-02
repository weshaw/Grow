import { Component, OnInit } from '@angular/core';

import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
	show : boolean;
	commands : any;
	constructor(public g : GameService) { }

	ngOnInit() {
		this.show = false;
		this.commands = [];
	}

	command(e)
	{
		let command = e.target.value;
		let ret = "not a command";
		let args = command.split(":");
		args = args.filter(Boolean);
		command = args.splice(0,1);
		let runcom = '_'+command;
		e.target.value = '';
		if(typeof this[runcom] == "function")
		{
			ret = this[runcom].apply(this,args);
		}
		let c = {
			"value" : command,
			"result" : ret
		};
		if(ret!='')
		{
			this.commands.push(c);
			this.commands = this.commands.slice(-3);
		}
	}
	toggle()
	{
		this.show = !this.show;
	}

	_clear(level=null)
	{
		this.commands = [];
		return '';
	}
	_set_level(level=null)
	{
		if(level!==null)
		{
			this.g.state.level = parseInt(level);
			this.g.save();
			return "Level set to: "+(this.g.state.level);
		}
		return "You must specify a Level"
	}
	_buyroom(type="lettuce_guarden")
	{
		console.log(type);
		let res = this.g.add_room({"type":type});
		console.log(this.g.state,res);
		return type + " "+(res?"Success":"Failed");
	}
	_money(amount="100")
	{
		let money = parseFloat(amount);
		console.log(money);
		if(isNaN(this.g.state.credits))
			{ this.g.state.credits = 0; }
		this.g.state.credits += money;
		console.log(this.g.state);
		this.g.save();
		return money +" added";
	}
}
