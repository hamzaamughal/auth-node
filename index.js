const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Connect to DB
const url = 'mongodb+srv://node-auth:node-auth@cluster0.bdva6.mongodb.net/auth?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => console.log(`connected to DB`),)

// import routes
const authRoute = require('./routes/auth')

// route middleware
app.use('/api/user', authRoute)

app.listen(5000, () => {
    console.log(`Server Up and Running..!!`);
})