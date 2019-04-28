const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000

// Middlewares for every request
app.use(express.json())
app.use(morgan('dev'))


// Connect to MONGODB
mongoose.connect("mongodb://localhost:27017/got-characters", {useNewUrlParser: true}, () => {
    console.log("Connected to the DB")
})


// Routes
app.use("/characters", require('./routes/thronesRouter.js'))


// Global Server Error Handler - handles ANY thrown error from ANY of our routes above
app.use((err, req, res, next) => {
    console.error(err)
    return res.send({errMsg: err.message})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})