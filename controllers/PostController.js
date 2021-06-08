const Post = require('../models/post')

module.exports = {
    getAllPosts: (req, res) => {
        return res.send('get all posts')
    },
    getPost: (req, res) => {
        return res.send('get single post')
    },
    getUserPosts: (req, res) => {
        return res.send('get user posts')
    },
    getUserPost: (req, res) => {
        return res.send('get user post')
    },
    createPost: async (req, res) => {
        // return res.send('create post')
        try {
            const post = new Post({
                userId: res.user.id,
                title: req.body.title,
                body: req.body.body
            })
    
            await post.save( (err, newPost) => {
                if(err){
                   return res.status(500).json({err:err, message:err.message})
                }else{
                   return res.status(201).json(newPost)
                }
            })
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },
    updatePost: (req, res) => {
        return res.send('update post')
    },
    deletePost: (req, res) => {
        return res.send('delete post')
    }
}