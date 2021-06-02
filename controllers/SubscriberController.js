const Subscriber = require('../models/subscriber')

module.exports = {
    getAllSubscribers: async (req, res) => {
        try {
            const subscribers = await Subscriber.find()
            res.json(subscribers)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getSubscriberById: (req, res) => {
        res.json(res.subscriber)
    },
    createSubscriber: async (req, res) => {
        const subscriber = new Subscriber({
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel
        })
    
        try {
            const newSubscriber = await subscriber.save()
            res.status(201).json(newSubscriber)
        } catch (error) {
            res.status(400).json({message: error.message })
        }
    },
    updateSubscriber: async (req, res) => {
        if(req.body.name != null){
            res.subscriber.name = req.body.name
        }
        if(req.body.subscribedToChannel != null){
            res.subscriber.subscribedToChannel = req.body.subscribedToChannel
        }
    
        try {
            const updatedSubscriber = await res.subscriber.save()
            res.json(updatedSubscriber)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    deleteSubscriber: async (req, res) => {
        try {
            await res.subscriber.remove()
            res.json({ message: 'Deleted Subscriber' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}