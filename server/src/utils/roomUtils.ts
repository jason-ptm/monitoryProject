import { build, Room, roomType, type } from "../types";

const parseSelect = (unParseSelect: any): boolean => {
    if (typeof unParseSelect != 'boolean') {
        throw new Error('Incorrect or mising select')
    }
    return unParseSelect
}

const parseBuild = (unParseBuild: any): build => {
    if (!Object.values(build).includes(unParseBuild) && unParseBuild != undefined) {
        throw new Error('Incorrect or mising build')
    }
    return unParseBuild
}

const parseRoomType = (unParseRoomType: any) => {
    if (!Object.values(roomType).includes(unParseRoomType) && unParseRoomType != undefined) {
        throw new Error('Incorrect or missing room type')
    }
    return unParseRoomType
}

const parseRoom = (unParseRoom: any): string => {
    return unParseRoom
}

const parseType = (unParseType: any): type => {
    if (!Object.values(type).includes(unParseType) && unParseType != undefined) {
        throw new Error('Incorrect or missing type')
    }
    return unParseType
}

const getNewRoom = (unParserRoom: any): Room => {
    return {
        selected: parseSelect(unParserRoom.selected),
        build: parseBuild(unParserRoom.build),
        roomType: parseRoomType(unParserRoom.roomType),
        room: parseRoom(unParserRoom.room),
        type: parseType(unParserRoom.type)

    }
}

export default getNewRoom