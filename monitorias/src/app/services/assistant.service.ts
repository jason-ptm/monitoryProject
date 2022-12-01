import { Injectable } from '@angular/core';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  private url: string = 'http://localhost:3000/apimonitorias/'

  calendar: Room[][] = [
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }],
    [{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }]
  ];

  constructor() { }
}
