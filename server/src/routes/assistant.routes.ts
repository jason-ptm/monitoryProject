import express from 'express'

const assistantRouter = express.Router()

assistantRouter.get('/', (_req, res) => {
    res.send('get')
})

assistantRouter.get('/:id', (_req, res) => {
    // const id = req.params.id
    res.send('get id')
})

assistantRouter.post('/', (_req, res) => {
    try {
        res.send('sd').status(200)
    }
    catch (e: any) {
        res.sendStatus(400).send(e.message)
    }
})

assistantRouter.put('/:id', (_req, res) => {
    // const id = req.params.id
    // const newData = req.body

    res.send('post')
})

assistantRouter.delete('/:id', (_req, res) => {
    // const id = req.params.id

    res.send('delete')
})

export default assistantRouter