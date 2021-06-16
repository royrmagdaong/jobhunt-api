require('dotenv').config()

const express = require('express')
var cors = require('cors');
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors());

// Database connection
mongoose.connect(process.env.DATABASE_URL, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// import routes
const UserRoutes = require('./routes/Users')
const JopPostRoutes = require('./routes/Job_Posts')

// Routes
app.use('/user', UserRoutes)
app.use('/job-post', JopPostRoutes)





app.listen(process.env.PORT, () => console.log(`Server Started at port ${process.env.PORT}`))