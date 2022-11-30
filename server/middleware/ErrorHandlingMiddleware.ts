

module.exports = function (err: any, req: any, res: any, next: any) {
    if (err instanceof CustomError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}