import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'monitorias';

  urlActual: string = 'classRoom';

  constructor() { }


  openMenu() {
    document.querySelector('#nav-bar')?.classList.toggle('show');
    // change icon
    document.querySelector('#header-toggle')?.classList.toggle('fa-bars');
    document.querySelector('#header-toggle')?.classList.toggle('fa-x');
    // add padding to body
    document.querySelector('#body-pd')?.classList.toggle('body-pd');
    // add padding to header
    document.querySelector('#header')?.classList.toggle('body-pd');
  }

  setUrl(url: string) {
    this.urlActual = url;
  }
}
