import express from 'express'
const router = express.Router()
const userRouter = require('./userRouter')

router.use('/user', userRouter)

export default router