const JobPost = require('../models/jobPost')

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            let page = parseInt(req.query.page)-1
            let limit = 10
            let query = {}
            await JobPost.find(query)
            // .sort([['created_at',1],['expectedSalary',-1]])
            .sort([['created_at',1]])
            .skip(page * limit)
            .limit(limit)
            .populate('applicants', ['name', 'email', 'contact_num'])
            .populate('author', ['name', 'email', 'contact_num'])
            .exec(async (err, jobposts) => {
                if(err) return res.send(err)
                await JobPost.countDocuments(query).exec((count_err, count) => {
                    if(count_err) return res.send(err)
                    return res.json({
                        response: true,
                        data: {
                            total: count,
                            page: page+1,
                            limit,
                            pageSize: jobposts.length,
                            jobs: jobposts
                        }
                    })
                })
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
                expectedSalary: req.body.expectedSalary,
                numberOfApplicantNeeded: req.body.numberOfApplicantNeeded
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