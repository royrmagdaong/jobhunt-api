const express = require('express')
const router = express.Router()
const JobPostController = require('../controllers/JobPostController')
const authenticate = require('../middlewares/authenticate')
const authRole = require('../middlewares/authRole')

// get all posts
router.get('/',
    JobPostController.getAllPosts
)

// create job post
router.post('/create', 
    authenticate, 
    authRole(['company-admin', 'company-user']),
    JobPostController.createJobPost
)

// apply 
router.post('/apply', 
    authenticate, 
    authRole(['applicant']),
    JobPostController.apply
)

module.exports = router