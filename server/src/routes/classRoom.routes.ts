import express from 'express'
// import cors from 'cors'
import { addAssistant, addClassRoom, getClassRooms, putClassRoom } from '../services/roomService'
import { getClassRoom, getNewClassRoom, parseAssist } from '../utils/classRoomUtils'

// const options: cors.CorsOptions = {
//     origin: ['http://localhost:4200']
// }


const classRoomRouter = express.Router()
// classRoomRouter.use(cors(options))

classRoomRouter.get('/', (_req, res) => {
    try {
        const classRooms = getClassRooms()
        console.log(classRooms)
        res.status(200).send(classRooms)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
})

classRoomRouter.get('/:id', (_req, res) => {
    // const id = req.params.id

    res.send('info con id')
})

classRoomRouter.patch('/:id', (req, res) => {
    try {
        const newAssistant = parseAssist(req.body)
        addAssistant(newAssistant, req.params.id)
        res.send(newAssistant).status(200)
    } catch (e: any) {
        res.send(e.message).status(400)
    }
})

classRoomRouter.post('/', async (req, res) => {
    try {
        let newClassRoom = getNewClassRoom(req.body)
        await addClassRoom(newClassRoom).then((data) => {
            console.log('added')
            return data
        })
        .catch((e:any) => {
            console.log(e.message)
            throw new Error('Error in add data to database!')
        })
        res.status(200).send(newClassRoom)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
})

classRoomRouter.put('/:id', (req, res) => {
    try {
        const newClassRoom = getClassRoom(req.body)
        putClassRoom(newClassRoom, req.params.id)
        res.status(200).send(newClassRoom)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
})

classRoomRouter.delete('/:id', (_req, res) => {
    // const id = req.params.id

    res.send('delete')
})

export default classRoomRouter