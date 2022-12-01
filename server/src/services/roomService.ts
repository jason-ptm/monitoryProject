import { NewClassRoom, AssistantDB, ClassRoomDB, ClassRoom, Assistant } from "../types";
import { classRoomModel } from "../model/post";
import { parseCalendarDB } from "../utils/classRoomUtils";

const classRooms: ClassRoomDB[] = []

export const addClassRoom = async (newClassRoom: NewClassRoom): Promise<any> => {

    return new classRoomModel({
        id: Math.round(Math.random() * (999999 - 100000) + 100000).toString(),
        ...newClassRoom,
        assistant: []
    }).save()
}

export const putClassRoom = (newClassRoom: ClassRoomDB, id: string): ClassRoomDB => {
    let index = classRooms.findIndex(classRoom => classRoom.id == id)
    classRooms[index] = newClassRoom
    return classRooms[index]
}

export const addAssistant = (newAssistant: AssistantDB, id: string): AssistantDB => {
    let index = classRooms.findIndex(classRoom => classRoom.id == id)
    if (!isNaN(index)) {
        classRooms[index].assistant?.push(newAssistant)
        return newAssistant
    }
    throw new Error('Error in add assistant')
}

export const getClassRooms = (): ClassRoom[] => {
    let classRooms: ClassRoom[] = []
    classRoomModel.find({}).then(data => {
        console.log(data)
        data.forEach(classRoom => {
            
            let assistants: Assistant[] = []
            classRoom.assistant.forEach(assistant =>{
                assistants.push({
                    code: assistant.code as string,
                    name: assistant.name as string,
                    calendar: parseCalendarDB(assistant.calendar)
                })
            })
            classRooms.push({
                id: classRoom.id,
                teachName: classRoom.teachName as string,
                className: classRoom.className as string,
                calendar: parseCalendarDB(classRoom.calendar),
                assistant: assistants 
            })
        })
    })
    .catch((e:any) => {
        console.log(e)
        throw new Error(e)
    })

    return classRooms
}