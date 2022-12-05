import { NewClassRoom, AssistantDB, ClassRoomDB, ClassRoom, Assistant } from "../types";
import { classRoomModel } from "../model/post";
import { parseCalendarDB } from "../utils/parseDbUtils"
const classRooms: ClassRoomDB[] = []

export const addClassRoom = async (newClassRoom: NewClassRoom): Promise<any> => {

    return new classRoomModel({
        id: Math.round(Math.random() * (999999 - 100000) + 100000).toString(),
        ...newClassRoom
    }).save()
}

export const putClassRoom = (newClassRoom: ClassRoomDB, id: string): ClassRoomDB => {
    let index = classRooms.findIndex(classRoom => classRoom.id == id)
    classRoomModel.findByIdAndUpdate(id, newClassRoom).then(_data => {
        
    })
    classRooms[index] = newClassRoom
    return classRooms[index]
}

export const addAssistant = async (newAssistant: AssistantDB[], id: string): Promise<any> => {
    return await classRoomModel.findByIdAndUpdate(id, { assistant: newAssistant })
        .then(data => {
            return data
        })
        .catch((e: any) => {
            console.log(e)
            throw new Error('Error in add assistant')
        })

}

export const getClassRooms = async (): Promise<ClassRoom[]> => {
    let classRooms: ClassRoom[] = []
    return await classRoomModel.find({}).then(data => {
        data.forEach(classRoom => {
            let assistants: Assistant[] = []
            classRoom.assistant.forEach(assistant => {
                assistants.push({
                    code: assistant.code as string,
                    name: assistant.name as string,
                    calendar: parseCalendarDB(assistant.calendar)
                })
            })
            classRooms.push({
                _id: classRoom._id.toString(),
                id: classRoom.id,
                teachName: classRoom.teachName as string,
                className: classRoom.className as string,
                calendar: parseCalendarDB(classRoom.calendar),
                assistant: assistants
            })
        })
        return classRooms
    })
        .catch((e: any) => {
            console.log(e)
            throw new Error(e)
        })
}

export const deleteClassRoom = async (id: string): Promise<any> => {
    return await classRoomModel.findByIdAndDelete(id)
        .then(data => {
            return data
        }).catch((e: any) => {
            console.log('No classroom deleted')
            throw new Error(e)
        })
}