require('dotenv').config()
const seeder = require('mongoose-seed');
const bcrypt = require('bcrypt')
let password = 'password'

seeder.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, async function() {
    await bcrypt.hash(password, 10, async (err, hashPassword) => {
        if(err){
            console.log(err)
        }else{
            const Users = {
                'model': 'User',
                'documents': [
                    {
                        role: "admin",
                        name: "admin",
                        email: "admin@gmail.com",
                        password: hashPassword,
                        verificationCode: Math.floor(100000 + Math.random() * 900000)
                    },
                    {
                        role: "company-admin",
                        name: "company admin",
                        email: "companyadmin@gmail.com",
                        password: hashPassword,
                        verificationCode: Math.floor(100000 + Math.random() * 900000)
                    },
                    {
                        role: "company-user",
                        name: "company user",
                        email: "companyuser@gmail.com",
                        password: hashPassword,
                        verificationCode: Math.floor(100000 + Math.random() * 900000)
                    },
                    {
                        role: "applicant",
                        name: "applicant",
                        email: "applicant@gmail.com",
                        password: hashPassword,
                        verificationCode: Math.floor(100000 + Math.random() * 900000)
                    },
                    {
                        role: "guest",
                        name: "guest",
                        email: "guest@gmail.com",
                        password: hashPassword,
                        verificationCode: Math.floor(100000 + Math.random() * 900000)
                    },
                ]
            }

            data.push(Users)

            await seeder.loadModels([
                './models/role',
                './models/user',
                './models/status'
            ])
        
            await seeder.clearModels([
                'Role', 
                'User',
                'Status'
            ],function(){})
        
            await seeder.populateModels(data, () => {
                seeder.disconnect()
            })
        }
    })
})

var data = [
    {
        'model': 'Role',
        'documents': [
            { roleId: 0, name: "admin" },
            { roleId: 1, name: "company-admin" },
            { roleId: 2, name: "company-user" },
            { roleId: 3, name: "applicant" },
            { roleId: 4, name: "guest" }
        ]
    },
    {
        'model': 'Status',
        'documents': [
            { statusId: 0, name: "close" },
            { statusId: 1, name: "open" }
        ]
    },

];