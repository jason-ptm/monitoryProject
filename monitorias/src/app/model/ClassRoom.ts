import { Assistant } from "./Assistant";
import { Room } from "./Room";

export class ClassRoom {
    public teachName: string;
    public className: string;
    public id: string;
    public _id!: string;
    public calendar: Room[][];
    public assistant !: Assistant[];

    constructor(teachName: string, className: string, id: string, _id: string, calendar: Room[][]) {
        this.teachName = teachName
        this.className = className;
        this.id = id
        this._id = _id
        this.calendar = calendar
    }

    public getClassName(): string {
        return this.className;
    }

    public getTeachName(): string {
        return this.teachName;
    }

    public setTeachName(teachName: string) {
        this.teachName = teachName;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }

    public getCalendar(): Room[][] {
        return this.calendar;
    }

    public setCalendar(calendar: Room[][]) {
        this.calendar = calendar;
    }

    public getAssistant(): Assistant[] {
        return this.assistant;
    }

    public setAssistant(assistant: Assistant[]) {
        this.assistant = assistant;
    }
}