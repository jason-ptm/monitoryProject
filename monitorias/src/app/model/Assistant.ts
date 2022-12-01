import { Room } from "./Room";

export class Assistant {
    public code: string;
    public name: string;
    public calendar: Room[][];

    constructor(code: string, name: string, calendar: Room[][]) {
        this.code = code;
        this.name = name;
        this.calendar = calendar
    }

    public getcode(): string {
        return this.code;
    }

    public getName(): string {
        return this.name
    }
}