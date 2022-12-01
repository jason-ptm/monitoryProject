import mongoose, { ConnectOptions } from 'mongoose'
import dotevn from 'dotenv'

dotevn.config();

mongoose.connect(
    process.env.URL_DB!,
    { useNewUrlParser: true } as ConnectOptions)
    .then((_client) => {
        console.log('Connected to DB!')
    })
    .catch((e) => {
        console.log(e)
    })