const CustomError = require('../error/CustomError')
const bcrypt = require('bcrypt')
import jwt from 'jsonwebtoken'
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
import User from '../models/models'
// import dotenv from 'dotenv'

// dotenv.config()
// const {Usr: any} = require('../models/models.ts')
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SECRET_KEY: string;
      
      }
    }
  }



const generateJwt = (id: number, email: string, role: string) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

  async getOneUser(req: any, res: any) {
    const id = req.params.id
    const user = await User.findOne({where: {id}})
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: "Пользователь не найден"})
    }
  }

  async updateUser(req: any, res: any) {
    const id = req.params.id
    const {email, password, role} = req.body
    const user = await User.findOne({where: {id}})
    if (user) {
      if (password) {
        const hashPassword = await bcrypt.hash(password, 5) 
        user.password = hashPassword
      }
      if (role) {
        user.role = role
      }
      if (user.email != email) {
        user.email = email
      }

      const updatedUser = await user.save()
      return res.status(200).json(updatedUser)
    } else {
      return res.status(404).json({message: "Пользователь не найден"})
    }
  }

    async registration(req: any, res: any, next: any) {
        const {email, password, role} = req.body
        if (!email || !password) {
            const err = new CustomError(403, 'Некорректный email или пароль')
            return next(res.status(err.status).json({error: err.message}))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            const err = new CustomError(403, 'Пользователь с таким email уже существует')
            return next(res.status(err.status).json({error: err.message}))
          //  return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        // const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req: any, res: any, next: any) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            const err = new CustomError(404, 'Пользователь не найден')
            return next(res.status(err.status).json({error: err.message}))
           // return next(new CustomError(404, 'Пользователь не найден'))
          //  return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            const err = new CustomError(403, 'Указан неверный пароль')
            return next(res.status(err.status).json({error: err.message}))
            // return next(new CustomError(500, 'Указан неверный пароль'))
           // return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req: any, res: any, next: any) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()