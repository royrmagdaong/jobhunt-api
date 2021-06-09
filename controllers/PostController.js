const JobPost = require('../models/jobPost')

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            await JobPost.find({})
            .populate('applicants', ['name', 'email', 'contact_num'])
            .populate('author', ['name', 'email', 'contact_num'])
            .exec((err, jobposts)=> {
                if(err) return res.send(err)
                return res.json({ response: true, data: jobposts})
            })
        } catch (error) {
            return res.status(500).json({ response: false, message: error.message })
        }
    },
    createJobPost: async (req, res) => {
        let jobPost
        try {
            jobPost = new JobPost({
                author: res.user.id,
                jobTitle: req.body.jobTitle,
                jobDescription: req.body.jobDescription,
                expectedSalary: req.body.expectedSalary
            })
            await jobPost.save((err, newJobPost) => {
                if(err){
                    res.status(500).json({ response: false, message: err.message})
                }else{
                    res.status(201).json({response: true, jobPost: newJobPost })
                }
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    apply: async (req, res) => {
        try {
            await JobPost.findOne({_id: '60bfa40d412ad7085079b11a'}).exec((err, jobpost)=>{
                if(err) return res.send(err)
                jobpost.applicants.push(res.user.id)
                jobpost.save(err=>{
                    if(err) return res.send(err)
                    return res.send({jobpost})
                }) 
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}