import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';


import { StorageService } from './service/store.service';
import { GameService } from './service/game.service';

import { AppComponent } from './app.component';
import { StatusComponent } from './component/status/status.component';
import { GameComponent } from './component/game/game.component';
import { ConsoleComponent } from './component/console/console.component';


@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    GameComponent,
    ConsoleComponent
  ],
  imports: [
	BrowserModule,
	FormsModule,
	HttpModule
  ],
  providers: [StorageService,GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
