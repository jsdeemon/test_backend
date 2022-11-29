// const Router: any = require('express')
import express from 'express'
const router = express.Router()
// const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
// const brandRouter = require('./brandRouter')
// const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
// router.use('/type', typeRouter)
// router.use('/brand', brandRouter)
// router.use('/device', deviceRouter)

export default router