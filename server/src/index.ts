import express from 'express'
import cors from 'cors'
import classRoomRouter from './routes/classRoom.routes'

require('./services/db')

const options: cors.CorsOptions = {
    origin: [
        'http://localhost:4200',
        'https://pa-monitorias.netlify.app'
    ]
}


const app = express()
app.use(cors(options))
app.use(express.json())

const PORT = 3000 || process.env.PORT

app.use('/apimonitorias/classroom', classRoomRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})