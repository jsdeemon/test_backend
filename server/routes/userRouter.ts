import express from 'express'
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')


// Private routes
router.put('/:id', checkRoleMiddleware('ADMIN'), userController.updateUser)
router.get('/auth', authMiddleware, userController.check)
router.get('/admin', checkRoleMiddleware('ADMIN'), userController.check)

// Public routes
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/:id', userController.getOneUser)// 

module.exports = router