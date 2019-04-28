const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000

// Middlewares
app.use(express.json())
app.use(morgan('dev'))


// Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/got-characters", {useNewUrlParser: true}, () => {
    console.log("connected to the DB")
})


// Routes
app.use("/characters", require('./routes/thronesRouter.js'))


// Global Server Error Handler - handles ANY thrown error from ANY of our routes above (always do after Routes so it catches all errors)
app.use((err, req, res, next) => {
    console.error(err)
    return res.send({errMsg: err.message})
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
// In front-end package.json add `"proxy": "http://localhost:7000"`