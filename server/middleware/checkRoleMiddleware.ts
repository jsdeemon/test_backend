// const jwt = require('jsonwebtoken')

module.exports = function(role: string) {
    return function (req: any, res: any, next: any) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({message: "Не авторизован admin"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа, так как вы не администратор"})
            }
            req.user = decoded;
            next()
        } catch (e) {
           // return res.status(401).json(e)
             res.status(401).json({message: "Не авторизован ошибка"})
        }
    };
}