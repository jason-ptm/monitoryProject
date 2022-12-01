import getNewRoom from "./roomUtils";
import { AssistantDB, ClassRoomDB, NewClassRoom, RoomDB, Room, build, roomType, type } from "../types";

const parserString = (unParserStrign: any, type: string): string => {
    if ((typeof unParserStrign != 'string')) {
        console.log(`Incorrect or missing ${type}`)
        throw new Error(`Incorrect or missing ${type}`)
    }
    return unParserStrign
}

const parseCode = (unParserCode: any): string => {
    if (parseInt(unParserCode) == NaN) {
        console.log('Incorrect or missing code')
        throw new Error('Incorrect or missing code')
    }
    return unParserCode
}

const parseCalendar = (unParserCalendar: any): RoomDB[] => {
    let parserCalendar: RoomDB[] = []
    if (!Array.isArray(unParserCalendar)) {
        throw new Error(`Incorrect or missing calendar`)
    }
    for (let row = 0; row < unParserCalendar.length; row++) {
        for (let col = 0; col < unParserCalendar[row].length; col++) {
            try {
                if (unParserCalendar[row][col].selected) {
                    parserCalendar.push({
                        ...getNewRoom(unParserCalendar[row][col]),
                        index: [row, col]
                    })
                }
            } catch (e: any) {
                console.log(e.message)
                throw new Error(e.message)
            }
        }
    }
    return parserCalendar
}

export const parseAssist = (unParserAssistant: any): AssistantDB => {
    return {
        name: parserString(unParserAssistant.name, 'assistant name'),
        code: parseCode(unParserAssistant.code),
        calendar: parseCalendar(unParserAssistant.calendar)
    }

}

const parseAssistants = (unParserAssistants: any): AssistantDB[] => {
    if (!Array.isArray(unParserAssistants)) {
        throw new Error(`Incorrect or missing calendar`)
    }
    for (let i = 0; i < unParserAssistants.length; i++) {
        unParserAssistants[i] = parseAssist(unParserAssistants[i])
    }
    return unParserAssistants
}

export const parseCalendarDB = (unParserCalendar: any): Room[][] => {
    let newRoom: Room[][] = []
    for (let i = 0; i < 16; i++) {
        newRoom.push([])
        for (let j = 0; j < 6; j++) {
            newRoom[i].push({
                selected: false,
                build: build.undefined,
                roomType: roomType.undefined,
                room: '',
                type: type.undefined
            })
        }
    }

    unParserCalendar.forEach((element:RoomDB) =>{
        newRoom[element.index[0] as number][element.index[1] as number] = {
            selected: true,
            build: element.build,
            roomType: element.roomType,
            room: element.room,
            type: element.type
        }
    })

    return newRoom
}


export const getNewClassRoom = (unParserClassRoom: any): NewClassRoom => {
    return {
        teachName: parserString(unParserClassRoom.teachName, 'teach name'),
        className: parserString(unParserClassRoom.className, 'class name'),
        calendar: parseCalendar(unParserClassRoom.calendar)
    }
}

export const getClassRoom = (unParserClassRoom: any): ClassRoomDB => {
    return {
        id: parserString(unParserClassRoom.id, 'id'),
        teachName: parserString(unParserClassRoom.teachName, 'teach name'),
        className: parserString(unParserClassRoom.className, 'class name'),
        calendar: parseCalendar(unParserClassRoom.calendar),
        assistant: parseAssistants(unParserClassRoom.assistant)
    }
}