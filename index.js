const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts');

dotenv.config()

// Connect to DB
const url = process.env.DB_CONNECT
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => console.log(`connected to DB`),)

// Middleware
app.use(express.json())
// route middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(5000, () => {
    console.log(`Server Up and Running..!!`);
})