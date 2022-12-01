import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  hours: string[] = [
    '6:00 - 7:00',
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
  ];

  sedes: string[] = [
    'Aduanilla paiba',
    'Calle 34',
    'Calle 40',
    'Calle 64',
    'Bosa porvenir',
    'Vivero',
    'Tecnologica',
    'Macarena A',
    'Macarena B'
  ]

  roomType: string[] = [
    'Salon',
    'Laboratorio',
    'Auditorio',
    'Salon informatica',
    'Asistido por TIC'
  ]

  constructor() { }
}
