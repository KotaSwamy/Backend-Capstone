const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const app = express()
const userRoute = require('./routes/userRoute.js')
const jobRoute = require('./routes/jobRoute.js')
const verifytoken = require('./middlewares/verifytoken.js')

app.use(bodyParser.urlencoded())
app.use(express.json())

app.use('/user', userRoute);
app.use('/job', verifytoken, jobRoute);

app.get('/', (req,res) => {
    res.send('Hello Iam backend project')
})
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.mongoURL)
    .then(() => {console.log('MongoDB Connected')} )
    .catch((error) => {console.log(error)})
})
