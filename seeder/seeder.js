require('dotenv').config()
const seeder = require('mongoose-seed');
const bcrypt = require('bcrypt')
const Role = require('../models/role');

let password = 'password'

seeder.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, async function() {
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
                            verificationCode: Math.floor(100000 + Math.random() * 900000)
                        },
                        {
                            role: roles.COMPANY_ADMIN,
                            name: "company admin",
                            email: "companyadmin@gmail.com",
                            password: hashPassword,
                            verificationCode: Math.floor(100000 + Math.random() * 900000)
                        },
                        {
                            role: roles.COMPANY_USER,
                            name: "company user",
                            email: "companyuser@gmail.com",
                            password: hashPassword,
                            verificationCode: Math.floor(100000 + Math.random() * 900000)
                        },
                        {
                            role: roles.APPLICANT,
                            name: "applicant",
                            email: "applicant@gmail.com",
                            password: hashPassword,
                            verificationCode: Math.floor(100000 + Math.random() * 900000)
                        },
                        {
                            role: roles.GUEST,
                            name: "guest",
                            email: "guest@gmail.com",
                            password: hashPassword,
                            verificationCode: Math.floor(100000 + Math.random() * 900000)
                        },
                    ]
                }
    
                data.push(Users)
    
                await seeder.loadModels([
                    './models/user',
                    './models/status'
                ])
            
                await seeder.clearModels([
                    'User',
                    'Status'
                ],function(){})
            
                await seeder.populateModels(data, () => {
                    seeder.disconnect()
                })
            }
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