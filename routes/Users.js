const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const getUser = require('../middlewares/getUser')
const checkEmail = require('../middlewares/checkEmail')
const authenticate = require('../middlewares/authenticate')
const authRole = require('../middlewares/authRole')

// get all users
router.get('/', 
    authenticate, 
    authRole(['super-admin', 'admin']), 
    UserController.getAllUser
)

// sign in user
router.post('/signin', 
    UserController.signInUser
)

// create user admin and super-admin only
router.post('/create', 
    authenticate, 
    checkEmail,
    authRole(['super-admin', 'admin']),
    UserController.createUser
)

// create applicant
router.post('/create/applicant',
    checkEmail,
    UserController.createApplicant
)

// create company
router.post('/create/company',
    checkEmail,
    UserController.createCompany
)

// update user info
router.patch('/update/:id', 
    authenticate, 
    getUser, 
    UserController.updateUserInfo
)

// deactivate user
router.post('/delete/:id', 
    authenticate, 
    authRole(['super-admin', 'admin']),
    getUser,
    UserController.deleteUser
)

// get deleted users
router.get('/deleted', 
    authenticate, 
    authRole(['super-admin', 'admin']),
    UserController.getDeletedUsers
)

// reactivate user
router.post('/reactivate/:id', 
    authenticate, 
    authRole(['super-admin', 'admin']), 
    UserController.reactivateUser
)

module.exports = router