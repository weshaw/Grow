import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	type : string;
	constructor() { this.type = "local"; }
	get(key,type=this.type)
	{
		var v = null;
		if (type+'Storage' in window && window[type+'Storage'] !== null) {
			v = window[type+'Storage'].getItem(key);
			try{ v = JSON.parse(v); } catch (e) { }
		}
		console.log("S-GET",key,v);
		return v;
	}
	set(key,value,type=this.type)
	{
		console.log("S-SET",key,value);
		if (type+'Storage' in window && window[type+'Storage'] !== null) {
			if(typeof value == "object") {try{ value = JSON.stringify(value); }catch(e){}}
			window[type+'Storage'].setItem(key,value);
			return true;
		}
		return false;
	}
	remove(key,type=this.type)
	{
		if (type+'Storage' in window && window[type+'Storage'] !== null) {
			return window[type+'Storage'].removeItem(key);
		}
		return false;
	}
}
