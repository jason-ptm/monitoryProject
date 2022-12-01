import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assistant } from '../model/Assistant';
import { ClassRoom } from '../model/ClassRoom';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {

  public classRoomsArray: ClassRoom[] = [];
  public selectedClassRoom!: ClassRoom | undefined;
  public assistant!: Assistant;
  public selectedCeld !: Room | undefined;

  private url: string = 'http://localhost:3000/apimonitorias/'

  calendarClassRoom: Room[][] = [
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

  calendarAssistant: Room[][] = [
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

  constructor(
    private http: HttpClient
  ) { }

  getClassRoomsArray(): ClassRoom[] {
    return this.classRoomsArray;
  }

  setSelectedClassRoom(ClassRoom: Object): void {
    this.selectedClassRoom = ClassRoom as ClassRoom;
  }

  setSelectedClassRoomById(id: string): void {
    let newClassRoom = this.classRoomsArray.find(classRoom => classRoom.id == id.split(' ')[1])
    if (newClassRoom) {
      this.selectedClassRoom = newClassRoom
    }
  }

  setSelectedCeld(x: number, y: number): void {
    this.selectedCeld = this.selectedClassRoom?.calendar[x][y]
  }

  setAssistantCeld(x: number, y: number, type: string): void {
    this.calendarAssistant[x][y] = {
      selected: true,
      type: 'assist',
      roomType: type
    }
  }

  clearClassCalendar(): void {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 6; j++) {
        this.calendarClassRoom[i][j] =
        {
          selected: false
        }
      }
    }
    this.selectedClassRoom = undefined
  }

  clearAssistantCalendar(): void {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 6; j++) {
        this.calendarAssistant[i][j] = {
          selected: false
        }
      }
    }
  }

  getClassRooms(): void {
    this.http.get<ClassRoom[]>(this.url + 'classroom').subscribe(res => {
      this.classRoomsArray = res
    })
  }

  addClassRoom(teachName: string, className: string): Observable<ClassRoom> {
    return this.http.post<ClassRoom>(this.url + 'classroom', {
      teachName: teachName,
      className: className,
      calendar: this.calendarClassRoom
    })
  }

  selectCeld(formValues: any, x: number, y: number): void {
    this.calendarClassRoom[x][y] =
    {
      selected: true,
      room: formValues.classRoomNumber,
      build: formValues.build,
      type: 'class',
      roomType: formValues.roomType
    }
  }

  clearCeld(i: number, j: number): void {
    this.calendarClassRoom[i][j] =
    {
      selected: false,
      room: undefined,
      build: undefined,
      type: undefined,
      roomType: undefined
    }
  }

  clearCeldAssistant(i: number, j: number): void {
    this.calendarAssistant[i][j] =
    {
      selected: false,
      room: undefined,
      build: undefined,
      type: undefined,
      roomType: undefined
    }
  }

  addAssistant(formValues: any): Observable<Assistant> {
    return this.http.patch<Assistant>(this.url + 'classroom/' + this.selectedClassRoom?.id,{
      name: formValues.name,
      code: formValues.code,
      calendar: this.calendarAssistant
    })
  }
}
