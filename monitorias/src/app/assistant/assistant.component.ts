import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {

  constructor(public _routingService: RoutingService, private _router:Router) { }

  ngOnInit(): void {
    this._router.navigate(['assistant/add'])
  }

}
