import mongoose, { Schema } from "mongoose";

interface Room {
    index: Number[],
    selected: Boolean,
    build: String,
    roomType: String,
    room: String,
    type: String
}

interface Assistant {
    code: String,
    name: String,
    calendar: Room[]
}

interface ClassRoom {
    teachName: String,
    className: String,
    id: String,
    calendar: Room[],
    assistant: Assistant[]
}

const roomSchema = new Schema<Room>({
    index: [Number],
    selected: { type: String, required: true },
    build: { type: String, required: false },
    roomType: { type: String, required: false },
    room: { type: String, required: false },
    type: { type: String, required: false }
})

const assistantSchema = new Schema<Assistant>({
    code: { type: String},
    name: { type: String },
    calendar: [roomSchema]
})

const classRoomSchema = new Schema<ClassRoom>({
    teachName: { type: String, required: false },
    className: { type: String, required: false },
    id: { type: String, required: false, unique: true },
    calendar: [roomSchema],
    assistant: [{type: assistantSchema, default: undefined}]
})

// export const roomModel = mongoose.model('Room', roomSchema)
// export const assistantModel = mongoose.model('Assistant', assistantSchema)
export const classRoomModel = mongoose.model('ClassRoom', classRoomSchema)