import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GameService } from './service/game.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(public g : GameService){

	}
	ngOnInit()
	{
	}
	continue()
	{
		this.g.state.level=1;
		this.g.save();
		return;
	}
}
