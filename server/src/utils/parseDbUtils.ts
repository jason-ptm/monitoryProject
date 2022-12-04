import { build, Room, RoomDB, roomType, type } from "../types"


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