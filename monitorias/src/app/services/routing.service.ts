import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  direction:string = 'add';

  constructor(private _router:Router) { }

  navigationEvent(){
    this._router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        return true;
      }
      return false;
    })
    return true;
  }
}
