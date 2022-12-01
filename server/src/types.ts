export enum roomType {
    salon = 'Salon',
    laboratorio = 'Laboratorio',
    audit = 'Auditorio',
    salInf = 'Salon informatica',
    tic = 'Asistido por TIC',
    undefined = ' '
}

export enum build {
    paiba = 'Aduanilla paiba',
    call34 = 'Calle 34',
    call40 = 'Calle 40',
    call64 = 'Calle 64',
    porvenir = 'Bosa porvenir',
    vivero = 'Vivero',
    tecno = 'Tecnologica',
    macaA = 'Macarena A',
    macaB = 'Macarena B',
    undefined = ' '
}

export enum type {
    class = 'class',
    monit = 'assist',
    undefined = ' '
}

export interface Assistant {
    code: string
    name: string
    calendar: Room[][]
}

export interface AssistantDB{
    code: string
    name: string
    calendar: RoomDB[]
}

export interface Room {
    selected: boolean
    build: build
    roomType: roomType
    room: string
    type: string
}

export interface RoomDB extends Room{
    index: Number[]
}

export interface ClassRoom {
    id: string
    teachName: string
    className: string
    calendar: Room[][]
    assistant: Assistant[]
}

export interface ClassRoomDB{
    id: string
    teachName: string
    className: string
    calendar: RoomDB[]
    assistant: AssistantDB[]
}

export type NewClassRoom = Omit<ClassRoomDB, 'id' | 'assistant'>