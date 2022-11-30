require('dotenv').config()
import express from 'express'
import db from './db' 
const jwt = require('jsonwebtoken')
import cors from 'cors' 
import router from './routes/index'
import path from 'path' 
// const db = require('./db.ts')
// const models = require('./models/models')
// -const cors = require('cors') 
// const routr: any = require('./routes/index.ts') 
// const path = require('path')
const PORT = process.env.PORT || 5000 


const app = express()
app.use(cors())
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
// app.use(errorHandler)

const start = async () => {
    try {
        await db.authenticate()
        console.log('Connection to Postgres has been established successfully.');
         await db.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()