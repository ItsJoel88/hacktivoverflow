if (process.env.NODE_ENV) require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('./config/mongoose')
const errorHandler = require('./middlewares/errorHandler')
const kue = require('kue')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
mongoose()

app.use('/', routes)
app.use('/kue', kue.app)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server connected to port ${PORT}`))