const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.find().where('deleted_at').equals(null)
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createUser: async (req, res) => {
        try {
            let user
            if(res.emailAlreadyExist){
                res.status(200).json({message: "email is already exists."})
            }else{
                await bcrypt.hash(req.body.password, saltRounds, async (err, hashPassword) => {
                    if(err){
                        res.status(500).json({ message:err.message })
                    }else{
                        user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashPassword
                        })
                        await user.save((err, newUser) => {
                            if(err){
                                res.status(500).json({err:err, message:err.message})
                            }else{
                                res.status(201).json(newUser)
                            }
                        })
                        
                    }
                })
            }
        } catch (error) {
            res.status(400).json({message: error.message })
        }
    },
    signInUser: async (req, res) => {
        let user
        try {
            user = await User.findOne({ email: req.body.email}).where('deleted_at').equals(null)
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err){
                        res.status(500).json({ err })
                    }else{
                        if(result){
                            jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.SECRET_KEY, (err, token) => {
                                if(err){
                                    res.status(500).json({ message: err.message })
                                }else{
                                    res.status(200).json({ id: user._id, name: user.name, email: user.email, token })
                                }
                            });
                        }else{
                            res.status(500).json({ message: "incorrect password" })
                        }
                    }
                })
            }else{
                res.status(500).json({ message: "User doesn't exist...", user})
            }
        } catch (error) {
            res.status(500).json({ message: "User doesn't exist." })
        }
    },
    updateUserInfo: async (req, res) => {
        let name = req.body.name
        let contact_num = req.body.contact_num
        let updated = false;
    
        if(name != null ){ res.user.name = name; updated = true; }
        if(contact_num != null ){ res.user.contact_num = contact_num; updated = true }
        if(updated){ res.user.updated_at = Date.now() }
    
        try {
            let updatedUser = await res.user.save()
            res.json({ user: updatedUser, message: 'user has been updated' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteUser: async (req, res) => {
        res.user.deleted_at = Date.now()
    
        try {
            let deletedUser = await res.user.save()
            res.json(deletedUser)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getDeletedUsers: async (req, res) => {
        try {
            const users = await User.find().where('deleted_at').ne(null)
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    reactivateUser: async (req, res) => {
        try {
            let user = await User.findById(req.params.id).where('deleted_at').ne(null)
            if(user != null){
                user.deleted_at = null
                let updatedUser = await user.save()
                res.json({ user: updatedUser, message: "user reactivated"})
            }else{
                res.json({ message: 'cannot find user' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}