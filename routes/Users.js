const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const getUser = require('../middlewares/getUser')
const checkEmail = require('../middlewares/checkEmail')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, UserController.getAllUser)
router.post('/signin', UserController.signInUser)
router.post('/create', checkEmail, UserController.createUser)
router.patch('/update/:id', verifyToken, getUser, UserController.updateUserInfo)
router.post('/delete/:id', verifyToken, getUser, UserController.deleteUser)
router.get('/deleted', verifyToken, UserController.getDeletedUsers)
router.post('/reactivate/:id', verifyToken, UserController.reactivateUser)

module.exports = router