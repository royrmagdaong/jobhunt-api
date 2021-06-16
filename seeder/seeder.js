require('dotenv').config()
const seeder = require('mongoose-seed');
const bcrypt = require('bcrypt')
const Role = require('../models/role');
const generateCode = require('../middlewares/generateCode')
const Applicant = require('../models/applicant')
const Company = require('../models/company')
const User = require('../models/user')

let password = 'password'

seeder.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, async function() {
    await Role.deleteMany({}).exec(async (err)=>{
        if(err) console.log(err)
        console.log('roles collection cleared.')
        const roles = await new Role(
            {
                ADMIN: 'admin',
                COMPANY_ADMIN: 'company-admin',
                COMPANY_USER: 'company-user',
                APPLICANT: 'applicant',
                GUEST: 'guest'
            }
        )
        await roles.save( async (err, newRoles) => {
            if(err) console.log(err)
            if(newRoles) console.log('roles created.')
            await Role.findOne({ADMIN: 'admin'}).exec( async (err, roles) => {
                if(err) console.log(err)
                await bcrypt.hash(password, 10, async (err, hashPassword) => {
                    if(err){
                        console.log(err)
                    }else{
                        const Users = {
                            'model': 'User',
                            'documents': [
                                {
                                    role: roles.ADMIN,
                                    name: "admin",
                                    email: "admin@gmail.com",
                                    password: hashPassword,
                                    verificationCode: generateCode(),
                                    is_verified: true
                                },
                                {
                                    role: roles.COMPANY_ADMIN,
                                    name: "company admin",
                                    email: "companyadmin@gmail.com",
                                    password: hashPassword,
                                    verificationCode: generateCode(),
                                    is_verified: true
                                },
                                {
                                    role: roles.COMPANY_USER,
                                    name: "company user",
                                    email: "companyuser@gmail.com",
                                    password: hashPassword,
                                    verificationCode: generateCode(),
                                    is_verified: true
                                },
                                {
                                    role: roles.APPLICANT,
                                    name: "applicant",
                                    email: "applicant@gmail.com",
                                    password: hashPassword,
                                    verificationCode: generateCode(),
                                    is_verified: true
                                },
                                {
                                    role: roles.GUEST,
                                    name: "guest",
                                    email: "guest@gmail.com",
                                    password: hashPassword,
                                    verificationCode: generateCode(),
                                    is_verified: true
                                },
                            ]
                        }
            
                        data.push(Users)
                        
                        // load models
                        await seeder.loadModels([
                            './models/user',
                            './models/status',
                            './models/applicant',
                            './models/company'
                        ])
                        
                        // reset counter
                        await Applicant.counterReset('applicantNumber', (err)=>{ if(err) console.log(err) })
                        await Company.counterReset('companyNumber', (err)=>{ if(err) console.log(err) })
                    
                        // clear models
                        await seeder.clearModels([
                            'User',
                            'Status',
                            'Applicant',
                            'Company'
                        ],function(){})
                        
                        // populate models
                        await seeder.populateModels(data, async () => {

                            // POPULATE APPLICANT AND COMPANY
                            // applicant
                            await User.findOne({email: 'applicant@gmail.com'}).exec( async (err, user) => {
                                if(err) console.log(err)
                                const applicant = await new Applicant({
                                    userId: user._id
                                })
                                applicant.save((err)=>{
                                    if(err) console.log(err)
                                    console.log('applicant@gmail.com is added on applicant collection')
                                })
                            })
                            // company
                            await User.findOne({email: 'companyadmin@gmail.com'}).exec( async (err, user) => {
                                if(err) console.log(err)
                                console.log('companyadmin@gmail.com is added on company collection')
                                const company = await new Company({
                                    userId: user._id,
                                    companyName: user.name,
                                    companyEmail: user.email
                                })
                                await company.save( async (err, company)=>{
                                    if(err) console.log(err)
                                    await User.findOne({email: 'companyuser@gmail.com'}).exec( async (err, user) => {
                                        if(err) console.log(err)
                                        company.companyUsers.push(user._id)
                                        await company.save( async (err)=>{ 
                                            if(err) console.log(err)
                                            console.log('companyuser@gmail.com is added on companyadmin company')
                                            // close server
                                            await seeder.disconnect()
                                        })
                                    })
                                })
                            })
                            
                        })
                    }
                })
            })
        })
    })
})

var data = [
    {
        'model': 'Status',
        'documents': [
            {
                statusId: 0,
                name: 'close'
            },
            {
                statusId: 1,
                name: 'open'
            }
        ]
    },

];