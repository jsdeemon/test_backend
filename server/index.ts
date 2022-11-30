require('dotenv').config()
import express from 'express'
import db from './db' 
const jwt = require('jsonwebtoken')
import cors from 'cors' 
import router from './routes/index'

const PORT = process.env.PORT || 5000 

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


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