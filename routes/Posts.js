const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const authenticate = require('../middlewares/authenticate')
const authRole = require('../middlewares/authRole')

// get all posts
router.get('/', 
    authenticate, 
    authRole(['super-admin','admin']), 
    PostController.getAllPosts
)

// get post
router.get('/:id', 
    authenticate,
    PostController.getPost
)

// get user posts
router.post('/user', 
    authenticate,
    PostController.getUserPosts
)

// get user post
router.post('/user/:id', 
    authenticate,
    PostController.getUserPost
)

// create post
router.post('/create', 
    authenticate,
    authRole(['super-admin','admin', 'company', 'applicant']),
    PostController.createPost
)

// update post
router.patch('/update', 
    authenticate,
    authRole(['super-admin','admin', 'company', 'applicant']),
    PostController.updatePost
)

// delete post
router.post('/delete', 
    authenticate,
    authRole(['super-admin','admin', 'company', 'applicant']),
    PostController.deletePost
)

module.exports = router