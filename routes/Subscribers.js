const express = require('express')
const router = express.Router()
const SubscriberController = require('../controllers/SubscriberController')
const getSubscriber = require('../middlewares/getSubscriber')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, SubscriberController.getAllSubscribers)
router.get('/:id', verifyToken, getSubscriber, SubscriberController.getSubscriberById)
router.post('/create', verifyToken, SubscriberController.createSubscriber)
router.patch('/update/:id', verifyToken, getSubscriber, SubscriberController.updateSubscriber)
router.delete('/delete/:id', verifyToken, getSubscriber, SubscriberController.deleteSubscriber)

module.exports = router