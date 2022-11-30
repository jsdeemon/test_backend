//const jwt = require('jsonwebtoken')
//const {Request, Response} = require('express')
module.exports = function (req: any, res: any, next: any) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        if (token.role != "ADMIN") {
            return res.status(401).json({message: "Доступ разрешен только администратору"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}