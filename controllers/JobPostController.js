const JobPost = require('../models/job_post')
const JobStatus = require('../models/job_status')

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            let page = (parseInt(req.query.page)-1) || 0
            let limit = 10
            let query = {}
            await JobPost.find(query)
            // .sort([['created_at',1],['expectedSalary',-1]])
            .sort([['created_at',1]])
            .skip(page * limit)
            .limit(limit)
            .populate('applicants', ['name', 'email', 'contact_num'])
            .populate('status', ['statusId', 'name'])
            .populate('author', ['role', 'name', 'email'])
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
        try {
            let jobPost
            await JobStatus.find({}).exec(async (err, status)=>{
                if(err) return res.status(500).send(err)
                jobPost = await new JobPost({
                    author: res.user.id,
                    jobTitle: req.body.jobTitle,
                    jobDescription: req.body.jobDescription,
                    expectedSalary: req.body.expectedSalary,
                    numberOfApplicantNeeded: req.body.numberOfApplicantNeeded,
                    status: status[1]._id
                })
                await jobPost.save((err, newJobPost) => {
                    if(err){
                        res.status(500).json({ response: false, message: err.message})
                    }else{
                        res.status(201).json({response: true, jobPost: newJobPost })
                    }
                })
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    apply: async (req, res) => {
        try {
            await JobPost.findOne({_id: '60ca23831123651c280e34c9'}).exec((err, jobpost)=>{
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