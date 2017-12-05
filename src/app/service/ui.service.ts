import { Injectable } from '@angular/core';

@Injectable()
export class UiService {
  show : any;
  models : any;
  constructor() {
    this.show = {};
    this.show.rooms = true;
    this.models = [];
  }

	toggle(name) : boolean
	{
		return this.show[name] = !this.show[name];
	}
  toggle_model(name)
  {
    console.log(name);
    if(this.models.indexOf(name)<0)
      { this.models.push(name); }
    let state = this.show[name];
    for(let i=0,l=this.models.length; i<l; i++)
    {
      this.show[this.models[i]] = false;
    }
    if(!state)
    {
      this.show[name] = true;
    }
    return this.show[name];
  }
}
