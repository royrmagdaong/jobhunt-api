const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const authenticate = require('../middlewares/authenticate')
const authRole = require('../middlewares/authRole')

// get all posts
router.get('/',
    PostController.getAllPosts
)

// create job post
router.post('/create', 
    authenticate, 
    authRole(['company-admin', 'company-user']),
    PostController.createJobPost
)

// apply 
router.post('/apply', 
    authenticate, 
    authRole(['applicant']),
    PostController.apply
)

module.exports = router