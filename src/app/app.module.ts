import { BrowserModule } from '@angular/platform-browser';
import { NgModule,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {nvD3} from 'ng2-nvd3'


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,nvD3
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
