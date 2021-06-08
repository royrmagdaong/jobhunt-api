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
                        role: "super-admin",
                        name: "super admin",
                        email: "superadmin@gmail.com",
                        password: hashPassword
                    },
                    {
                        role: "admin",
                        name: "admin",
                        email: "admin@gmail.com",
                        password: hashPassword
                    },
                    {
                        role: "company",
                        name: "company",
                        email: "company@gmail.com",
                        password: hashPassword
                    },
                    {
                        role: "applicant",
                        name: "applicant",
                        email: "applicant@gmail.com",
                        password: hashPassword
                    },
                    {
                        role: "guest",
                        name: "guest",
                        email: "guest@gmail.com",
                        password: hashPassword
                    },
                ]
            }

            data.push(Users)

            await seeder.loadModels([
                './models/role',
                './models/user'
            ])
        
            await seeder.clearModels([
                'Role', 
                'User'
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
            { roleId: 0, name: "super-admin" },
            { roleId: 1, name: "admin" },
            { roleId: 2, name: "company" },
            { roleId: 3, name: "applicant" },
            { roleId: 4, name: "guest" }
        ]
    }
];